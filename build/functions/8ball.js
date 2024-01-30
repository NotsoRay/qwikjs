"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EightBall = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
/**
 * @param {string} question
 * @param {EightBallOptions} options
 */
function EightBall(question, options) {
    const answers = ["yes", "maybe", "absolutely", "probably", "no", "maybe not", "i don't know"][Math.floor(Math.random() * 7 + 1)];
    if (options && options.embed) {
        const embed = new discord_js_1.default.EmbedBuilder();
        if (options.target instanceof discord_js_1.default.User) {
            embed.setAuthor({ name: options.target.username, iconURL: options.target.displayAvatarURL() });
        }
        embed.addFields({
            name: 'Question:',
            value: `${question.endsWith('?') ? question : question + '?'}`
        }, {
            name: 'Answer:',
            value: `${answers}`
        });
        if (options.message) {
            if (options.message instanceof discord_js_1.default.Message) {
                return options.message.reply({ embeds: [embed] });
            }
            else {
                if (options.message.deferred) {
                    return options.message.editReply({ embeds: [embed] });
                }
                else {
                    return options.message.reply({ embeds: [embed] });
                }
            }
        }
        else {
            return {
                embed,
                question,
                answers
            };
        }
    }
    return {
        question,
        answers
    };
}
exports.EightBall = EightBall;
