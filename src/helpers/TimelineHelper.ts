import { DateTime } from "luxon";
import { Session } from "../interfaces/Market";
import MarketStatus from "../enums/MarketStatus";
import config from "../config";

const timelineHourPeriod = config.timelineVisiblePeriod;

export interface Segment {
  start: number;
  duration: number;
  status: MarketStatus;
}

function cleanTimelineSegments(segments: Segment[]): Segment[] {
  const returnedSegments: Segment[] = [...segments]
    .sort((a, b) => {
      return a.start - b.start;
    })
    .map((segment: Segment, index, array) => {
      let duration = segment.duration;
      const size = array.length;

      const nextIndex = index + 1;
      if (nextIndex < size) {
        const nextSegment = array[nextIndex];
        if (segment.status === nextSegment.status) {
          duration += nextSegment.duration;
        }
      }

      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        const previousSegment = array[previousIndex];
        if (segment.status === previousSegment.status) {
          duration = 0;
        }
      }

      return { ...segment, duration };
    })
    .filter((segment: Segment) => segment.duration !== 0);

  return returnedSegments;
}

export function resolveTimelineSegments(time: DateTime, timezone: string, sessions: Session[]): Segment[] {
  const timelineViewportStart = time.minus({ hours: timelineHourPeriod / 2 });
  const timelineViewportEnd = time.plus({ hours: timelineHourPeriod / 2 });

  const segments = sessions
    .filter((session) => {
      return !(
        DateTime.fromJSDate(session.startTime, { zone: timezone }) > timelineViewportEnd ||
        DateTime.fromJSDate(session.endTime, { zone: timezone }) < timelineViewportStart
      );
    })
    .map((session) => {
      const { startTime, endTime, status } = session;
      let sessionStartTime = DateTime.fromJSDate(startTime, { zone: timezone });
      if (sessionStartTime < timelineViewportStart) {
        sessionStartTime = timelineViewportStart;
      }
      let sessionEndTime = DateTime.fromJSDate(endTime, { zone: timezone });
      if (sessionEndTime > timelineViewportEnd) {
        sessionEndTime = timelineViewportEnd;
      }
      return {
        start: sessionStartTime.diff(timelineViewportStart).as("minutes"),
        duration: sessionEndTime.diff(sessionStartTime).as("minutes") + 1,
        status,
      };
    });

  return cleanTimelineSegments(segments);
}
