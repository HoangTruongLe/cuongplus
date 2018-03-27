class Admins::AdminsController < ApplicationController
  before_action :authenticate_admin!

  def index
    @admins = Admin.all.page(params[:page])
  end
end
