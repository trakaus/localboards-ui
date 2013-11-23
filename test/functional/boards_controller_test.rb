require 'test_helper'

class BoardsControllerTest < ActionController::TestCase
  setup do
    @board = boards(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
