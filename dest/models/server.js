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
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../db/config");
;
class Server {
    constructor() {
        // path for routes
        this.routePaths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            uploads: '/api/uploads',
            search: '/api/search',
            upload: '/api/upload'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        //  Conectar DB
        this.databaseConnect();
        // middlewares
        this.middlewares();
        // routes
        this.routes();
    }
    databaseConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Parsing body
        this.app.use(express_1.default.json());
        // Static page
        this.app.use(express_1.default.static('dest/public'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        //TODO: upload
        this.app.use(this.routePaths.auth, routes_1.routerAuth);
        this.app.use(this.routePaths.users, routes_1.routerUser);
        this.app.use(this.routePaths.categories, routes_1.routerCategory);
        this.app.use(this.routePaths.products, routes_1.routerProduct);
        this.app.use(this.routePaths.search, routes_1.routerSearch);
        this.app.use(this.routePaths.upload, routes_1.routerUpload);
        this.app.use('/register', express_1.default.static('dest/public/register.html'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`This Server is running in port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map