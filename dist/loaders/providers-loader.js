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
exports.default = providersLoader;
// loaders/providers-loader.js
const awilix_1 = require("awilix");
const path_1 = __importDefault(require("path"));
const containers_1 = __importDefault(require("../containers"));
const eventemitter2_1 = require("eventemitter2");
function providersLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        // register any asValue, singletons, etc:
        containers_1.default.register({ eventEmitter: (0, awilix_1.asValue)(new eventemitter2_1.EventEmitter2()) });
        // ─── SERVICES (Proxy) ───
        containers_1.default.loadModules(['modules/*/services/*{.js,.ts}'], {
            cwd: path_1.default.resolve(__dirname),
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix_1.Lifetime.SCOPED,
                injectionMode: awilix_1.InjectionMode.PROXY,
            },
        });
        // ─── CONTROLLERS (Classic) ───
        containers_1.default.loadModules(['modules/*/controllers/*{.js,.ts}'], {
            cwd: path_1.default.resolve(__dirname),
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix_1.Lifetime.SCOPED,
                injectionMode: awilix_1.InjectionMode.CLASSIC,
            },
        });
    });
}
