enum MarketStatus {
  Opened = "open",
  Closed = "close",
  Closed_Special = "close_special",
  Break = "break",
  BeforeMarket = "before_market",
  AfterMarket = "after_market",
}

export function getMainStatus(status: MarketStatus): MarketStatus {
  switch (status) {
    case MarketStatus.Opened:
    case MarketStatus.Break:
      return MarketStatus.Opened;
    case MarketStatus.Closed_Special:
    case MarketStatus.Closed:
    case MarketStatus.BeforeMarket:
    case MarketStatus.AfterMarket:
    default:
      return MarketStatus.Closed;
  }
}

export default MarketStatus;
