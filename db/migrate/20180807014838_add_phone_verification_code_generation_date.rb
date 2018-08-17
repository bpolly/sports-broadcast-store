class AddPhoneVerificationCodeGenerationDate < ActiveRecord::Migration[5.0]
  def change
    add_column :user_phones, :last_code_generated_at, :datetime, null: false
    add_column :user_phones, :verified_at, :datetime
    add_column :user_phones, :deleted_at, :datetime
    remove_column :user_phones, :verified, :boolean
    change_column_null :user_phones, :verification_code, false
  end
end
