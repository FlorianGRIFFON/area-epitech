import axios from 'axios';
import { handleAutomation } from '../Services/AutomationService';

// Function to send a message in discord
async function sendMessage(accessToken: string, webhookUrl: string, messageToSend: string): Promise<void> {
    try {
        const response = await axios.post(
            webhookUrl,
            {
                content: messageToSend,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        console.log('Message sent on Discord successfully:', response.data);
    } catch (error) {
        console.error('Error sending a message on Discord:', error.response?.data || error.message);
        throw error;
    }
}

export default async function handleDiscord(automation, accessToken: string) {
    const currentStep = automation.steps[0];
    const webhookUrl = currentStep.details.detail1
    const messageToSend = currentStep.details.detail2

    const numberOfSteps = Object.keys(automation.steps).length - 1;

    switch (currentStep.action) {
        case 'send_message':
            console.log("DiscordSendMessage");
            sendMessage(accessToken, webhookUrl, messageToSend)

            automation.steps.shift();

            if (numberOfSteps > 0) {
                handleAutomation(automation);
            }
            break;
        default:
            console.log("DiscordDefault");
            break;
    }


}
