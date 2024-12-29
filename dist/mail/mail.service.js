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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transpoter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });
    }
    async sendMail(email, id, res, from) {
        try {
            const link = `${process.env.BASE_URL}/verify/${id}`;
            const info = await this.transpoter.sendMail({
                from: from || process.env.EMAIL,
                to: email,
                subject: "Verify your Email Address",
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
	<div style="margin:50px auto;width:70%;padding:20px 0">
	  <div style="border-bottom:1px solid #eee">
		<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Ghor Khujo</a>
	  </div>
	  <p style="font-size:1.1em">Hi,</p>
	  <p>Thank you for choosing Your Ghor Khujo. Click this link to verify your account</p>
	  <a href="${link}">${link}</a>
	  <p style="font-size:0.9em;">Regards,<br />Ghor Khujo</p>
	  <hr style="border:none;border-top:1px solid #eee" />
	  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
		<p>Ghor Khujo</p>
		<p>1600 Amphitheatre Parkway</p>
		<p>California</p>
	  </div>
	</div>
  </div>`
            });
            return res.status(201).json({
                statusCode: 201,
                message: ["Email Send Successfully"]
            });
        }
        catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: ["Something went wrong"]
            };
        }
    }
    async sendMailClient(email, name, res, message, from) {
        try {
            const info = await this.transpoter.sendMail({
                from: from,
                to: email,
                subject: `Message From ${name}`,
                text: message
            });
            return res.status(201).json({
                statusCode: 201,
                message: ["Email Send Successfully"]
            });
        }
        catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: ["Something went wrong"]
            };
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map