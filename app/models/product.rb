class Product < ApplicationRecord
  has_many :photos, as: :imageable
  belongs_to :product_type
end
