class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|

      t.timestamps
    end
  end
end
