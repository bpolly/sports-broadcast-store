desc "Looks for games starting in the next 10 minutes"
task send_sms_notifications: [:environment] do
  NotificationSender.send_sms_notifications
end
