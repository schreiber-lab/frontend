import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import { SubmitCaptionEvent } from "shared/modules/file-uploader/file-uploader.component";
import { Dataset, User } from "shared/sdk";
import {
  addAttachmentAction,
  removeAttachmentAction,
  updateAttachmentCaptionAction,
} from "state-management/actions/datasets.actions";

import { DatasetFileUploaderComponent } from "./dataset-file-uploader.component";

describe("DatasetFileUploaderComponent", () => {
  let component: DatasetFileUploaderComponent;
  let fixture: ComponentFixture<DatasetFileUploaderComponent>;
  let dispatchSpy;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatasetFileUploaderComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (mockStore: MockStore) => {
    store = mockStore;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#onFileUploaderFilePicked()", () => {
    it("should dispatch an AddAttchment action", () => {
      dispatchSpy = spyOn(store, "dispatch");

      component.user = new User();
      component.dataset = new Dataset();
      const file = {
        name: "test",
        size: 100,
        type: "image/png",
        content: "abc123",
      };
      component.onFileUploaderFilePicked(file);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        addAttachmentAction({ attachment: component.attachment })
      );
    });
  });

  describe("#updateCaption()", () => {
    it("should dispatch an UpdateAttachmentCaptionAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      component.dataset = new Dataset();
      const event: SubmitCaptionEvent = {
        attachmentId: "testAttachmentId",
        caption: "Test caption",
      };
      component.updateCaption(event);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        updateAttachmentCaptionAction({
          datasetId: component.dataset.pid,
          attachmentId: event.attachmentId,
          caption: event.caption,
        })
      );
    });
  });

  describe("#deleteAttachment()", () => {
    it("should dispatch a DeleteAttachment action", () => {
      dispatchSpy = spyOn(store, "dispatch");

      component.dataset = new Dataset();
      const attachmentId = "testAttachmentId";
      component.deleteAttachment(attachmentId);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        removeAttachmentAction({
          datasetId: component.dataset.pid,
          attachmentId,
        })
      );
    });
  });
});
