import { DateTime } from "luxon";
import { Session } from "interfaces/Market";
import MarketStatus from "enums/MarketStatus";
import config from "config";

const { daysInFuture, daysInPast } = config;

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
  const timelineStart = time.minus({ days: daysInPast });
  const timelineEnd = time.plus({ days: daysInFuture });

  //const timelineViewportStart = time.minus({ hours: timelineVisiblePeriod / 2 });
  //const timelineViewportEnd = time.plus({ hours: timelineVisiblePeriod / 2 });

  const segments = sessions
    // .filter((session) => {
    //   return !(
    //     DateTime.fromJSDate(session.startTime, { zone: timezone }) > timelineEnd ||
    //     DateTime.fromJSDate(session.endTime, { zone: timezone }) < timelineStart
    //   );
    // })
    .map((session) => {
      const { startTime, endTime, status } = session;
      let sessionStartTime = DateTime.fromJSDate(startTime, { zone: timezone });
      if (sessionStartTime < timelineStart) {
        sessionStartTime = timelineStart;
      }
      let sessionEndTime = DateTime.fromJSDate(endTime, { zone: timezone });
      if (sessionEndTime > timelineEnd) {
        sessionEndTime = timelineEnd;
      }
      return {
        start: sessionStartTime.diff(timelineStart).as("minutes"),
        duration: sessionEndTime.diff(sessionStartTime).as("minutes") + 1,
        status,
      };
    });

  return cleanTimelineSegments(segments);
}
