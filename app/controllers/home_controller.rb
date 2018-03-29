class HomeController < ApplicationController
  layout 'sokuhaku'

  def index
    @products = Product.all
  end
end
