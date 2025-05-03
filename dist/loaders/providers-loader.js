"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const path_1 = __importDefault(require("path"));
const eventemitter2_1 = require("eventemitter2");
const containers_1 = __importDefault(require("../containers"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    //   container.register({
    //     isRecordExistsConstraint: asClass(IsRecordExistsConstraint).scoped(),
    // });
    const eventEmitter = new eventemitter2_1.EventEmitter2();
    containers_1.default.register({
        eventEmitter: (0, awilix_1.asValue)(eventEmitter)
    });
    containers_1.default.loadModules([
        "modules/*/services/*{.ts,.js}",
        "modules/*/controllers/*{.ts,.js}",
    ], {
        formatName: "camelCase",
        resolverOptions: {
            lifetime: "SINGLETON",
            injectionMode: awilix_1.InjectionMode.PROXY,
        },
        cwd: path_1.default.join(__dirname, "../"), // Set base directory for resolving paths
    });
    // container.loadModules(
    //     [
    //         "payment-providers/*{.ts,.js}",
    //     ],
    //     {
    //         formatName: (name: string) => `pp_${name}`,
    //         resolverOptions: {
    //             lifetime: "SINGLETON",
    //             injectionMode: InjectionMode.PROXY,
    //         },
    //         cwd: path.join(__dirname, "../"), // Set base directory for resolving paths
    //     },
    // );
});
