"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const home_entity_1 = require("../entitys/home.entity");
const typeorm_2 = require("typeorm");
const updateSqlGenerate_1 = require("../lib/helper/updateSqlGenerate");
const mail_service_1 = require("../mail/mail.service");
let HouseService = class HouseService {
    constructor(HouseRepo, mailService) {
        this.HouseRepo = HouseRepo;
        this.mailService = mailService;
    }
    async createHouse(data, user_id) {
        try {
            const rows = await this.HouseRepo.query('INSERT INTO `house`(`user_id`, `house_name`, `title`, `description`, `rent`, `address`, `tags`, `owner_name`, `phone`, `image`, `side_images`, `capacity`,`for`,`type`,`publishDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ', [
                user_id,
                data.house_name,
                data.title,
                data.desc,
                data.rent,
                data.address,
                data.tags.toString(),
                data.owner_name || '',
                data.phone,
                data.image,
                data.side_images || '',
                data.capacity || '',
                data.for || '',
                data.type || '',
                data.publishDate || ''
            ]);
            return {
                statusCode: 201,
                message: ["Home Submited Successfully"]
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Server error!');
        }
    }
    async getAllHouses(searchParams) {
        try {
            const rows = await this.HouseRepo.find();
            if (!Object.keys(searchParams).length) {
                return rows;
            }
            if (searchParams.search) {
                const search = searchParams.search.toLowerCase();
                return rows.filter(item => {
                    return (item.tags.toLowerCase().split(',').some(item => search.includes(item)))
                        || (item.title.toLowerCase().includes(search))
                        || (item.house_name.toLowerCase().includes(search))
                        || (item.address.toLowerCase().includes(search));
                });
            }
            let tempData = rows;
            if (searchParams?.address && searchParams?.address != ',,') {
                if (searchParams.address.split(',').length == 1) {
                    tempData = tempData.filter((item) => item.address
                        .toLowerCase()
                        .split(',')
                        .includes(searchParams.address.toLowerCase()));
                }
                else {
                    tempData = tempData.filter((item) => {
                        const addresses = searchParams.address.toLowerCase().split(',');
                        const match = item.address
                            .toLowerCase()
                            .split(',')
                            .some((item2) => addresses.includes(item2));
                        if (match) {
                            return item;
                        }
                    });
                }
            }
            if (searchParams?.type) {
                tempData = tempData.filter((item) => {
                    const addresses = searchParams.type.toLowerCase().split(',');
                    const match = item.type
                        .toLowerCase()
                        .split(',')
                        .some((item2) => addresses.includes(item2));
                    if (match) {
                        return item;
                    }
                });
            }
            if (searchParams?.for) {
                tempData = tempData.filter((item) => {
                    const addresses = searchParams.for.toLowerCase().split(',');
                    const match = item.for
                        .toLowerCase()
                        .split(',')
                        .some((item2) => addresses.includes(item2));
                    if (match) {
                        return item;
                    }
                });
            }
            if (parseInt(searchParams?.rent) > 1000) {
                tempData = tempData.filter(item => item.rent <= parseInt(searchParams.rent));
            }
            if (searchParams.range) {
                if (searchParams.range.includes("-")) {
                    const [first, second] = searchParams.range.split("-").map(Number);
                    tempData = tempData.slice(first, second);
                }
                else {
                    tempData = tempData.slice(0, parseInt(searchParams.range));
                }
            }
            return tempData.reverse();
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Server error!');
        }
    }
    async deleteHouse(id) {
        try {
            const rows = await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?', [id]);
            if (!rows?.length) {
                return new common_1.HttpException('Data not exists', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.HouseRepo.query('DELETE FROM house WHERE house_id=?', [id]);
            return {
                status: true,
                message: "Delete Successfully"
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Server error!');
        }
    }
    async updateHouse(data, id) {
        try {
            const rows = await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?', [id]);
            if (!rows?.length) {
                return new common_1.BadRequestException('Data not exisits');
            }
            const { sql, values } = await (0, updateSqlGenerate_1.generateUpdateSql)(data, 'house', id);
            await this.HouseRepo.query(sql, values);
            return {
                status: true,
                message: "Update Successfully"
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Server error!');
        }
    }
    async getSingleHouse(id) {
        try {
            const [house] = await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?', [id]);
            if (!house?.house_id) {
                return {
                    status: false,
                    message: "House not found"
                };
            }
            return house;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Server error!");
        }
    }
    async sendEmailToClient(from, to, message, name, res) {
        try {
            this.mailService.sendMailClient(to, name, res, message, from);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("server error");
        }
    }
    async getHouseUsingUserId(id) {
        try {
            const rows = await this.HouseRepo.query("SELECT * FROM house WHERE user_id=?", [id]);
            return rows;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("server error");
        }
    }
};
exports.HouseService = HouseService;
exports.HouseService = HouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(home_entity_1.House)),
    __metadata("design:paramtypes", [typeorm_2.Repository, mail_service_1.MailService])
], HouseService);
//# sourceMappingURL=house.service.js.map