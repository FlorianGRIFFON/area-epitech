import { handleAutomation } from '../Services/AutomationService';

// Check if today is a specific day of the week and the specified time
async function checkDayAndTime(step): Promise<boolean> {
  try {
    if (!step.details) {
      console.log('Details is undefined');
      return false;
    }

    const targetDayOfWeek = step.details.detail1.toLowerCase(); // 'sunday', 'monday', etc.
    const hour = step.details.detail2;
    const minute = step.details.detail3;

    const now = new Date();
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayOfWeek = daysOfWeek[now.getDay()].toLowerCase();

    // Check if today is the specified day of the week
    if (currentDayOfWeek === targetDayOfWeek) {
      if (now.getHours() === parseInt(hour, 10) && now.getMinutes() === parseInt(minute, 10)) {
        console.log(`checkDayAndTime is true for ${targetDayOfWeek} at ${hour}:${minute}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking DayAndTime:', error.response?.data || error.message);
    throw error;
  }
}

// Check if timer is equal to the set time
async function checkEveryday(step): Promise<boolean> {
  try {
    if (!step.details) {
      console.log('Details is undefined');
      return false;
    }

    const hour = step.details.detail1;
    const minute = step.details.detail2;

    const now = new Date();

    // Check if the current time is 2:00 PM
    if (now.getHours() === parseInt(hour, 10) && now.getMinutes() === parseInt(minute, 10)) {
      console.log('checkEveryday is true');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking TimerEveryday:', error.response?.data || error.message);
    throw error;
  }
}

export default async function handleTimer(automation) {
  let isTriggered: boolean;
  isTriggered = false;

  const currentStep = automation.steps[0];

  switch (currentStep.action) {
    case 'everyday':
      console.log('TimerEveryday');
      isTriggered = await checkEveryday(currentStep);
      break;
    case 'day':
      console.log('TimerDay');
      isTriggered = await checkDayAndTime(currentStep);
      break;
    default:
      console.log('TimerDefault');
      break;
  }

  if (isTriggered) {
    console.log('IsTriggered == true');
    automation.steps.shift();

    const numberOfSteps = Object.keys(automation.steps).length;

    if (numberOfSteps > 0) {
      handleAutomation(automation);
    }
  }
}
