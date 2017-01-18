class EntrantsController < ApplicationController
  before_action :set_entrant, only: [:show, :edit, :update, :destroy]

  # GET /entrants
  # GET /entrants.json
  def index
    @entrants = Entrant.all
  end

  # GET /entrants/1
  # GET /entrants/1.json
  def show
  end

  # GET /entrants/new
  def new
    @entrant = Entrant.new
  end

  # GET /entrants/1/edit
  def edit
  end

  # POST /entrants
  # POST /entrants.json
  def create
    @entrant = Entrant.new(entrant_params)

    respond_to do |format|
      if @entrant.save
        format.html { redirect_to @entrant, notice: 'Entrant was successfully created.' }
        format.json { render :show, status: :created, location: @entrant }
      else
        format.html { render :new }
        format.json { render json: @entrant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /entrants/1
  # PATCH/PUT /entrants/1.json
  def update
    respond_to do |format|
      if @entrant.update(entrant_params)
        format.html { redirect_to @entrant, notice: 'Entrant was successfully updated.' }
        format.json { render :show, status: :ok, location: @entrant }
      else
        format.html { render :edit }
        format.json { render json: @entrant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entrants/1
  # DELETE /entrants/1.json
  def destroy
    @entrant.destroy
    respond_to do |format|
      format.html { redirect_to entrants_url, notice: 'Entrant was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entrant
      @entrant = Entrant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entrant_params
      params.fetch(:entrant, {})
    end
end
