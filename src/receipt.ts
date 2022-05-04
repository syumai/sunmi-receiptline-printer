// @ts-ignore
import { SunmiV2Printer } from "react-native-sunmi-v2-printer";
// @ts-ignore
import receiptline from "receiptline";
import { Buffer } from "buffer";
global.Buffer = Buffer;

// Printer
const printer = {
  cpl: 32,
  encoding: "multilingual",
  spacing: true,
  command: "impact",
};

const receipt = `Ichigaya Terminal
1-Y-X Kudan, Chiyoda-ku
02-07-2021 21:00
{border:line; width:30}
^RECEIPT
{border:space; width:*,2,10}
BEER                   | 2|     13.00
CHIDORI                | 2|    172.80
-------------------------------------
{width:*,20}
^TOTAL             |          ^185.80
CASH               |           200.00
CHANGE             |            14.20
{code:20210207210001; option:48,hri}`;

export const printReceipt = async () => {
  try {
    // set aligment: 0-left,1-center,2-right
    await SunmiV2Printer.setAlignment(1);
    const result: string = receiptline.transform(receipt, printer);
    const buf = Buffer.from(result, "binary");
    await SunmiV2Printer.sendRAWData(buf.toString("base64"));
    await SunmiV2Printer.printOriginalText("\n\n\n\n");
  } catch (e) {
    console.error(e);
  }
};
