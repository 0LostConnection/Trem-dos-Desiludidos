const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate',
            disabled: true
        })
    }

    run = async (interaction) => {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'testModal') {
            await interaction.reply({ content: 'Your submission was received successfully!' });
            const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
            const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
            console.log({ favoriteColor, hobbies });
        }
    }
}