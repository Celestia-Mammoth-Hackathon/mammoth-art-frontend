export const simpleERC1155UpgradeableABI = [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "UPGRADE_INTERFACE_VERSION",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "acceptOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "id",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "balanceOfBatch",
      "inputs": [
        {
          "name": "accounts",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "ids",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "burn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "id",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "burnBatch",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "ids",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "cementContractMetadata",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "cementTokenMetadata",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "contractURI",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "contractURICemented",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "create",
      "inputs": [
        {
          "name": "_metadata",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_cemented",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "_minter",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "exists",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenAnimationURL",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenAttributeBool",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenAttributeInt",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "int256",
          "internalType": "int256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenAttributeUint",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenDescription",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenExternalURL",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenImage",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokenName",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "grantMinter",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_minter",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "hasTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        {
          "name": "_name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_initialOwner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_defaultRoyaltyReceiver",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_defaultRoyaltyFeeNumerator",
          "type": "uint96",
          "internalType": "uint96"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [
        {
          "name": "_to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "pendingOwner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "proxiableUUID",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceMinter",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revokeMinter",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_minter",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "royaltyInfo",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "salePrice",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "safeBatchTransferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "ids",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "id",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setContractMetadata",
      "inputs": [
        {
          "name": "_data",
          "type": "tuple",
          "internalType": "struct StdContractMetadata",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "image",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "externalLink",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "collaborators",
              "type": "string[]",
              "internalType": "string[]"
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setContractMetadata",
      "inputs": [
        {
          "name": "_data",
          "type": "tuple",
          "internalType": "struct RequiredContractMetadata",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setContractMetadata",
      "inputs": [
        {
          "name": "_data",
          "type": "tuple",
          "internalType": "struct FullContractMetadata",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "image",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "bannerImage",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "featuredImage",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "externalLink",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "collaborators",
              "type": "string[]",
              "internalType": "string[]"
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setContractMetadataRaw",
      "inputs": [
        {
          "name": "_jsonBlob",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setDefaultRoyalty",
      "inputs": [
        {
          "name": "_receiver",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_feeNumerator",
          "type": "uint96",
          "internalType": "uint96"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_value",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_value",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_value",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_traitType",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_value",
          "type": "int256",
          "internalType": "int256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenAttribute",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_attribute",
          "type": "tuple",
          "internalType": "struct Attribute",
          "components": [
            {
              "name": "traitType",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "value",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "displayType",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenMetadata",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_data",
          "type": "tuple",
          "internalType": "struct StdTokenMetadata",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "image",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "externalURL",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "animationURL",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "attributes",
              "type": "tuple[]",
              "internalType": "struct Attribute[]",
              "components": [
                {
                  "name": "traitType",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "value",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "displayType",
                  "type": "string",
                  "internalType": "string"
                }
              ]
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenMetadataRaw",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_jsonBlob",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTokenRoyalty",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_receiver",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_feeNumerator",
          "type": "uint96",
          "internalType": "uint96"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenURI",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenURICemented",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "upgradeToAndCall",
      "inputs": [
        {
          "name": "newImplementation",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "uri",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ContractURICemented",
      "inputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ContractURIUpdated",
      "inputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Initialized",
      "inputs": [
        {
          "name": "version",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MetadataCemented",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MetadataUpdate",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferStarted",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferBatch",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "ids",
          "type": "uint256[]",
          "indexed": false,
          "internalType": "uint256[]"
        },
        {
          "name": "values",
          "type": "uint256[]",
          "indexed": false,
          "internalType": "uint256[]"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferSingle",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "URI",
      "inputs": [
        {
          "name": "value",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "id",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Upgraded",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AddressEmptyCode",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ContractMetadataCemented",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ContractMetadataUnauthorized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ERC1155InsufficientBalance",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "balance",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "needed",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155InvalidApprover",
      "inputs": [
        {
          "name": "approver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155InvalidArrayLength",
      "inputs": [
        {
          "name": "idsLength",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "valuesLength",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155InvalidOperator",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155InvalidReceiver",
      "inputs": [
        {
          "name": "receiver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155InvalidSender",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1155MissingApprovalForAll",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1967InvalidImplementation",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC1967NonPayable",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ERC2981InvalidDefaultRoyalty",
      "inputs": [
        {
          "name": "numerator",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "denominator",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC2981InvalidDefaultRoyaltyReceiver",
      "inputs": [
        {
          "name": "receiver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC2981InvalidTokenRoyalty",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "numerator",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "denominator",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC2981InvalidTokenRoyaltyReceiver",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "receiver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "FailedInnerCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidInitialization",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotInitializing",
      "inputs": []
    },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "TokenMetadataCemented",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "TokenMetadataImmutable",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "TokenMetadataUnauthorized",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "UUPSUnauthorizedCallContext",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UUPSUnsupportedProxiableUUID",
      "inputs": [
        {
          "name": "slot",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    }
  ]