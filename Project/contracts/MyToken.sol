// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC20, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bool myVar;
    constructor() ERC20("GOLD", "GLD"){
       _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
       _grantRole(MINTER_ROLE, msg.sender);
    }
}