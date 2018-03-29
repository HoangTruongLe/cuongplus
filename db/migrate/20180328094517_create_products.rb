class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.references :product_type
      t.text :description
      t.string :imei
      
      t.timestamps
    end
  end
end
