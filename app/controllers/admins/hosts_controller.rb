# frozen_string_literal: true
class Admins::HostsController < ApplicationController
  before_action :authenticate_admin!
  before_action :find_host, only: [:rooms_list]

  def rooms_list
    @uuid = SecureRandom.uuid
    @roomCount = @host.try(:rooms).count || 0
  end

  def index
    @hosts = Host.all.page(params[:page]).includes(:rooms).per(EasySettings.paging.per)
  end

  private
    def find_host
      @host = Host.find_by_id(params[:id])
    end
end
