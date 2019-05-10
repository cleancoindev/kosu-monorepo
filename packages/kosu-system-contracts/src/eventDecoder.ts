import Decoder from "web3-eth-abi";
import { hexToNumberString, soliditySha3 } from "web3-utils";

import * as EventEmitter from "../generated-artifacts/EventEmitter.json";

const event: { name: string; type: string; inputs: Array<{ name: string; type: string }>} = EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as { name: string; type: string; inputs: Array<{ name: string; type: string }>};
const signature: string = soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`);

export const bytes32ToAddressString = (val: string): string => {
    return `0x${val.substr(26)}`;
};

export const bytes32ToBase64 = (val: string): string => {
    return Buffer.from(val.substr(2), "hex").toString("base64");
};

export const eventDecoder = (eventReturnValues: any): any => {
    const eventType = eventReturnValues.eventType;
    const data = eventReturnValues.data;
    const decoded = {
        eventType,
    };
    switch (eventType) {
        case "PosterRegistryUpdate":
            Object.assign(decoded, {
                poster: bytes32ToAddressString(data[0]),
                stake: hexToNumberString(data[1]), // TODO: better name
            });
            break;
        case "ValidatorRegistryUpdate":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                owner: bytes32ToAddressString(data[1]),
                stake: hexToNumberString(data[2]), // TODO: better name
            });
            break;
        case "ValidatorRegistered":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                applicationBlockNumber: hexToNumberString(data[1]), // TODO: better name
                owner: bytes32ToAddressString(data[2]),
                rewardRate: Decoder.decodeParameter("int", data[3]).toString(),
            });
            break;
        case "ValidatorChallenged":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                owner: bytes32ToAddressString(data[1]),
                challenger: bytes32ToAddressString(data[2]),
                pollId: hexToNumberString(data[3]),
            });
            break;
        case "PollCreated":
            Object.assign(decoded, {
                pollCreator: bytes32ToAddressString(data[0]),
                pollId: hexToNumberString(data[1]),
            });
            break;

        default:
            console.warn(`Unrecognized eventType: ${eventType}`);
    }
    return decoded;
};

export const decodeKosuEvents = (logs: any): any => {
    return logs.filter(log => log.topics[0] === signature).map(log => eventDecoder(Decoder.decodeLog(event.inputs, log.data, log.topics)));
};