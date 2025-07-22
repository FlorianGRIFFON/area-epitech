import Automation from 'App/Models/Automation';
import Service from 'App/Models/Service';
import handleSpotify from './SpotifyService';
import handleDiscord from './DiscordService';
import handleTimer from './TimerService';
import handleGmail from './GmailService'

export async function parseAutomations() {
  try {
    // Uncomment next line to get all Automation
    const automations = await Automation.all();
    // Get only Flo's automation
    // const automations = await Automation.query().where('user_id', 4)

    for (const automation of automations) {
      await handleAutomation(automation)
    }

    console.log('Parsing completed successfully.')
  } catch (error) {
    console.error('Error parsing automations:', error)
  }
}

export async function handleAutomation(automation) {
  if (
    !automation ||
    !automation.steps ||
    !Array.isArray(automation.steps) ||
    automation.steps.length === 0
  ) {
    console.log('Automation or steps is undefined or empty.')
    return
  }

  if (!automation.steps[0].type) {
    console.log('Automation has no type.')
    return
  }

  if (!automation.active) {
    // console.log('Automation is set to inactive.');
    return
  }

  const service = await Service.query().where('user_id', automation.user_id).first()

  if (!service) {
    console.log(`Service not found for user ID: ${automation.user_id}`)
    return
  }

  // Handle only the first step
  const type = automation.steps[0].type
  const typeLower = type.toLowerCase()

  const accessToken = getAccessTokenForService(typeLower, service)

  if (accessToken === null) {
    console.log('accessToken is null')
    return
  }

  switch (typeLower) {
    case 'spotify':
      await handleSpotifyAutomation(automation, accessToken)
      break
    case 'gmail':
      await handleGmailAutomation(automation, accessToken)
      break
    case 'calendar':
      await handleCalendarAutomation(automation, accessToken)
      break
    case 'slack':
      await handleSlackAutomation(automation, accessToken)
      break
    case 'discord':
      await handleDiscordAutomation(automation, accessToken)
      break
    case 'chatgpt':
      await handleChatgptAutomation(automation, accessToken)
      break
    case 'timer':
      await handleTimerAutomation(automation)
      break
    // Add more cases for additional service Lowers if needed
    default:
      console.log(`Unhandled automation Lower: ${typeLower}`)
      break
  }
}

function getAccessTokenForService(serviceType: string, service: any): string {
  switch (serviceType) {
    case 'spotify':
      return service.spotify_token
    case 'gmail':
      return "service.gmail_token"
    //   return service.gmail_token
    case 'calendar':
      return service.gmail_token
    case 'slack':
      return service.slack_token
    case 'discord':
      return service.discord_token
    case 'chatgpt':
      return service.chatgpt_token
    case 'timer':
      return 'timer'
    // Add more cases for additional service types if needed
    default:
      console.log(`Unhandled service type: ${serviceType}`)
      return ''
  }
}

async function handleSpotifyAutomation(automation, accessToken: string) {
  // Implement Spotify automation handling logic
  console.log('Handling Spotify automation')
  handleSpotify(automation, accessToken)
}

async function handleGmailAutomation(automation, accessToken: string) {
  // Implement Gmail automation handling logic
  console.log('Handling Gmail automation')
  handleGmail(automation, accessToken)
}

async function handleCalendarAutomation(automation, accessToken: string) {
  // Implement Calendar automation handling logic
  console.log('Handling Calendar automation')
}

async function handleSlackAutomation(automation, accessToken: string) {
  // Implement Slack automation handling logic
  console.log('Handling Slack automation')
}

async function handleDiscordAutomation(automation, accessToken: string) {
    // Implement Discord automation handling logic
    console.log('Handling Discord automation');
    handleDiscord(automation, accessToken)
}

async function handleChatgptAutomation(automation, accessToken: string) {
  // Implement Chatgpt automation handling logic
  console.log('Handling Chatgpt automation')
}

async function handleTimerAutomation(automation) {
  // Implement Timer automation handling logic
  console.log('Handling Timer automation')
  handleTimer(automation)
}
