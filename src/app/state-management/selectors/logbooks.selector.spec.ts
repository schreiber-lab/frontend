import * as fromLogbookSelectors from "./logbooks.selector";
import { initialLogbookState } from "../state/logbooks.store";
import { Logbook } from "../../shared/sdk/models";
import { LogbookFilters } from "state-management/models";

const filters: LogbookFilters = {
  textSearch: "string",
  showBotMessages: true,
  showUserMessages: true,
  showImages: true
}

describe("test Logbook Selectors", () => {
  it("should get filters", () => {
    expect(fromLogbookSelectors.getFilters.projector(initialLogbookState)).toEqual(filters)
  })
})