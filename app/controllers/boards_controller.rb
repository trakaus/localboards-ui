class BoardsController < ApplicationController
  # GET /boards
  # GET /boards.json
  def index

    #@boards = Board.all
    #respond_to do |format|
    #  format.html # index.html.erb
    #  format.json { render json: @boards }
    #end
  end

  # GET /boards/:id
  # GET /boards/:id.json
  def show
  	if params[:id].nil?
  		# search all
  	else
  		# search specific id
  		@id = params[:id]
		end
  end
end
