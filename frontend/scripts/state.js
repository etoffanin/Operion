const OPERATION_STATE = {
  IDLE: "idle",
  CAMERA_ACTIVE: "camera_active",
  RECORDING: "recording",
  FINISHED: "finished",
};

let currentOperationState = OPERATION_STATE.IDLE;

function setOperationState(newState) {
  currentOperationState = newState;
}

function getOperationState() {
  return currentOperationState;
}