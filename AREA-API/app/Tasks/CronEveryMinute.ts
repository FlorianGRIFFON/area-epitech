import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { parseAutomations } from '../Services/AutomationService'

export default class CronEveryMinute extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    // return CronTimeV2.everyTwoSeconds()
    return CronTimeV2.everyMinute()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    this.logger.info('Handled')
    parseAutomations()
  }
}
