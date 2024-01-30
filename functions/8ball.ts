import djs from 'discord.js'


interface EightBallOptions {
    embed?: boolean;
    target?: djs.User;
    message?: djs.Message | djs.ChatInputCommandInteraction
}

/**
 * @param {string} question
 * @param {EightBallOptions} options
 */
export function EightBall(question: string, options?: EightBallOptions) {
    const answers = ["yes", "maybe", "absolutely", "probably", "no", "maybe not", "i don't know"][Math.floor(Math.random() * 7 + 1)];

    if (options && options.embed) {
        const embed = new djs.EmbedBuilder();
        if (options.target instanceof djs.User) {
            embed.setAuthor({ name: options.target.username, iconURL: options.target.displayAvatarURL() })
        }
        embed.addFields({ 
            name: 'Question:',
            value: `${question.endsWith('?') ? question : question + '?'}`
        }, {
            name: 'Answer:',
            value: `${answers}`
        });

        if (options.message) {
            if (options.message instanceof djs.Message) {
                return options.message.reply({ embeds: [embed] });
            } else {
                if (options.message.deferred) {
                    return options.message.editReply({ embeds: [embed] });
                } else {
                    return options.message.reply({ embeds: [embed] });
                }
            }
        } else {
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
    }
}