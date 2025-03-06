// Type definitions for Web NFC
// Project: https://github.com/w3c/web-nfc
// Definitions by: Takefumi Yoshii <https://github.com/takefumi-yoshii>
// TypeScript Version: 3.9

// This type definitions referenced to WebIDL.
// https://w3c.github.io/web-nfc/#actual-idl-index

interface Window {
  NDEFMessage: NDEFMessage;
}

declare class NDEFMessage {
  public constructor(messageInit: NDEFMessageInit);
  public readonly records: NDEFRecord[];
}

declare interface NDEFMessageInit {
  records: NDEFRecordInit[];
}

declare type NDEFRecordDataSource = string | BufferSource | NDEFMessageInit

interface Window {
  NDEFRecord: NDEFRecord;
}

declare class NDEFRecord {
  public constructor(recordInit: NDEFRecordInit);
  public readonly recordType: string;
  public readonly mediaType?: string;
  public readonly id?: string;
  public readonly data?: DataView;
  public readonly encoding?: string;
  public readonly lang?: string;
  public toRecords?: () => NDEFRecord[];
}

declare interface NDEFRecordInit {
  recordType: string;
  mediaType?: string;
  id?: string;
  encoding?: string;
  lang?: string;
  data?: NDEFRecordDataSource;
}

declare type NDEFMessageSource = string | BufferSource | NDEFMessageInit;

interface Window {
  NDEFReader: NDEFReader;
}

declare class NDEFReader extends EventTarget {
  public constructor();
  public onreading: (this: this, event: NDEFReadingEvent) => any;
  public onreadingerror: (this: this, error: Event) => any;
  public scan: (options?: NDEFScanOptions) => Promise<void>;
  public write: (message: NDEFMessageSource, options?: NDEFWriteOptions) => Promise<void>;
  public makeReadOnly: (options?: NDEFMakeReadOnlyOptions) => Promise<void>;
}

interface Window {
  NDEFReadingEvent: NDEFReadingEvent;
}

declare class NDEFReadingEvent extends Event {
  public constructor(type: string, readingEventInitDict: NDEFReadingEventInit);
  public serialNumber: string;
  public message: NDEFMessage;
}

interface NDEFReadingEventInit extends EventInit {
  serialNumber?: string;
  message: NDEFMessageInit;
}

interface NDEFWriteOptions {
  overwrite?: boolean;
  signal?: AbortSignal;
}

interface NDEFMakeReadOnlyOptions {
  signal?: AbortSignal;
}

interface NDEFScanOptions {
  signal: AbortSignal;
}
