pragma solidity ^0.8.0;

contract UserStatus {
    mapping(address => string) public status;

    event StatusUpdated(address indexed user, string newStatus);

    function updateStatus(string memory newStatus) public {
        status[msg.sender] = newStatus;
        emit StatusUpdated(msg.sender, newStatus);
    }

    function getStatus(address user) public view returns (string memory) {
        return status[user];
    }
}
