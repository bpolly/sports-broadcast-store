desc "Looks for games starting in the next 10 minutes"
task :send_sms_notifications, [:minutes] => [:environment] do |t, args|
  NotificationSender.send_sms_notifications(args[:minutes])
end

task :send_email_notifications, [:minutes] => [:environment] do |t, args|
  NotificationSender.send_email_notifications(args[:minutes])
end
