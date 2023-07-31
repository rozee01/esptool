import { Transport } from "./webserial";
export declare function classicReset(transport: Transport, resetDelay?: number): Promise<void>;
export declare function usbJTAGSerialReset(transport: Transport): Promise<void>;
export declare function hardReset(transport: Transport, usingUsbOtg?: boolean): Promise<void>;
export declare function validateCustomResetStringSequence(seqStr: string): boolean;
/**
 * Custom reset strategy defined with a string.
 *
 * The sequenceString input string consists of individual commands divided by "|".
 *
 * Commands (e.g. R0) are defined by a code (R) and an argument (0).
 *
 * The commands are:
 *
 * D: setDTR - 1=True / 0=False
 *
 * R: setRTS - 1=True / 0=False
 *
 * W: Wait (time delay) - positive integer number (miliseconds)
 *
 * "D0|R1|W100|D1|R0|W50|D0" represents the classic reset strategy
 */
export declare function customReset(transport: Transport, sequenceString: string): Promise<void>;
declare const _default: {
    classicReset: typeof classicReset;
    customReset: typeof customReset;
    hardReset: typeof hardReset;
    usbJTAGSerialReset: typeof usbJTAGSerialReset;
    validateCustomResetStringSequence: typeof validateCustomResetStringSequence;
};
export default _default;
