import { isMainnet } from "./details";

import AurasMerkleTree from "./merkle/auras-tree.json";
import ModSummitMerkleTree from "./merkle/modularsummit-tree.json";
import SlothFreeTree from "./merkle/sloth-free-tree.json";
import SlothPaidTree from "./merkle/sloth-paid-tree.json";
import HabitatTokens from "./tokens/habitats.json";

export const nfts = [
    // {
    //     uuid: "4924a3ff-8f92-4854-b6b8-1f77656e2968",
    //     contractCreator: "0xc0de00000dE60f7F19C70311982e74c854E0ef6C",
    //     metadata: {
    //         "id": "0",
    //         "name": "Forma [genesis]",
    //         "description": "Upon Forma's new node,\nEchoes of creation's reign,\nWonders shaped in code.",
    //         "image": "ipfs://bafkreiay4jbz5szj4cgld7mttydi2gttcihij4gak562gnd7nh4hi6moii",
    //         "tags": [ "genesis", "forma" ],
    //         "creators": [],
    //         "attributes": [
    //           { "trait_type": "Origin", "value": "Genesis" },
    //           { "trait_type": "Creation Era", "value": "Canvas" },
    //         ],
    //         "formats": [{
    //             "uri": "ipfs://bafkreiay4jbz5szj4cgld7mttydi2gttcihij4gak562gnd7nh4hi6moii",
    //             "mime_type": "image/png",
    //             "file_size": 4122,
    //             "file_name": "forma-genesis.png",
    //             "dimensions": {
    //                 "value": "1488x1664",
    //                 "unit": "px"
    //             },
    //             "hash": {
    //                 "value": "18e2439ecb29e08cb1fd939e068d1a73120e84f0c0577da3347f69f874798e42",
    //                 "algo": "sha-256",
    //             },
    //         }],
    //       },
    //       "type": "ERC1155",
    //       "tokenAddress": "0x0aa7a608343faf8c0db275205d1eaf70585103e8",
    //       "tokenId": "0",
    //       "contractType": "ERC1155",
    //       "royalty": 500,
    //       "deployed": true,
    //       "created": true,
    //       "price": 0.01,
    //       "slug": "forma-genesis"
    // },
    {
        "uuid": "3b55c560-bbc9-4834-b25e-de846b6e884d",
        "contractCreator": "0x518201899E316bf98c957C73e1326b77672Fe52b",
        "collectionName": "Glover Interface",
        showCollection: false,
        "metadata": {
            "id": "0",
            "name": "Glover Interface",
            "description": "Glover Interface is a sculptural modular interface holding a 19th Century landscape painting. The tablet is heavy and worn by the elements, like a device left in the bush, a mechanic and organic weave. It is a tactile artifact for inspection, draped in the nostalgia of landscape painting's sublime themes and traditions.",
            "image": "ipfs://bafybeidjxxjxj43rgy2zbalr4t4cj6lxnyspq7auo42pv64nriytdn6w54",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://bafybeigt3cfaet5mirmc2mzvgaqzsl3pzulp3gyarepupxc3xdrmktidsm",
                "mime_type": "image/png",
                "file_size": 463491386,
                "dimensions": {
                    "value": "10000x10000",
                    "unit": "px"
                },
                "hash": {
                    "value": "3b317f60fadc90cfafb439ae484ef371af68da543e820044fe20950e614db81b",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://bafybeidjxxjxj43rgy2zbalr4t4cj6lxnyspq7auo42pv64nriytdn6w54",
                "mime_type": "image/webp",
                "file_size": 1184614,
                "dimensions": {
                    "value": "2048x2048",
                    "unit": "px"
                },
                "hash": {
                    "value": "14eba1de28d112b1dbee8fdd815c9e233b3a86168e321c6e6a87e1333ebf3f0c",
                    "algo": "sha-256",
                },
            }],
        },
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0xf14eee1d7ec4a417bfd99c08a4f7ffca73ca5dcc" : "0x063eA336c397d8112bcd7707164148cCCBEfB218",
        "tokenId": "0",
        "contractType": "ERC1155",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": 0.5,
        "slug": "glover-interface"
    },
    {
        "uuid": "4602eb9d-c3a8-4b90-995d-a0e354a93a81",
        "contractCreator": "0x7af35AACf09082a535119c18E2a565BA947C5B40",
        "collectionName": "Stones",
        showCollection: false,
        "metadata": {
            "id": "0",
            "name": "Stone: e/acc",
            "description": "Technology was born three million years ago, when prehuman species in the Olduvai Gorge in modern day Tanzania first started using stone tools. These stones, modest though they may seem, are the first link in the daisy chain reaction which led us to the industrial revolution, nuclear weapons, the internet, and artificial intelligence - a daisy chain which extends far beyond us, beyond an unseeable horizon, and into an invisible future. Technology is inseparable from culture: it is not for nothing that the word 'techne' in Greek, from which the word technology derives, means 'art and craft'. Together, technological and cultural evolution form the double helix of human history - dancing forward together indomitably into eternity. Whether it be a dance of joy or a Danse Macabre, it all begins with the stone.\n\n'Stones' - the second artwork by the Autonomous Culture Research Bureau, examines these artefacts with detachment and objectivity, from the standpoint of a museum at the end of history - the Angel of History at the conclusion of the double helix.\n\nThe audiovisual work consists of two bespoke revolving 3D-modelled flint stones, marked 'e/acc' and 'safety', respectively representing techno-utopianism and techno-pessimism. They are the flints that Prometheus steals from the gods to make fire. The techno-utopian stone is carved with the image of Promethean fire that represents human progress and the flame of technology which lights the way to a brighter future. The artifact revolves faster than the safety one given its accelerationist qualities, and given that it was sent from the future it is much scarcer - only 555 exist.\n\nThe soundtrack backing the 'e/acc' stone is reverberating from a post-singularity future and features a bright, optimistic tune reminiscent of an anime theme song, accompanied by the voice of a benevolent ASI with a message of the Promised Land to come once it is built, inspired by the self professed e/accs such as Beff Jezos, Marc Andreessen and others. Whether to trust the voice from the future is left as an exercise to the reader.\n\nThe works are the first by the Autonomous Culture Research Bureau in what will be a series of works examining technology and culture from this perspective - of the museum at the end of history. From the interaction of these first two stones, presented as ERC-1155 projects, and other Modularian artefacts, Phase II of the project will be born.",
            "image": "ipfs://bafybeiew7mmewog5x7c7oq3f6n4eyx5knhoden3rc64rz3qcxxdfsyfcr4",
            "animation_url": "ipfs://bafybeia2kmu2d7bj7uulpxwksjp7ucqw7qsldorwfcv44wkclkmtwmt7ee",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://bafybeia2kmu2d7bj7uulpxwksjp7ucqw7qsldorwfcv44wkclkmtwmt7ee",
                "mime_type": "video/mp4",
                "file_size": 75666685,
                "dimensions": {
                    "value": "2048x2048",
                    "unit": "px"
                },
                "hash": {
                    "value": "584a8a6a9ef02d11342f71b5695f5c75e0c5c6204bf55fb02fa1427ed86dad91",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://bafybeiew7mmewog5x7c7oq3f6n4eyx5knhoden3rc64rz3qcxxdfsyfcr4",
                "mime_type": "image/webp",
                "file_size": 1566720,
                "dimensions": {
                    "value": "400x400",
                    "unit": "px"
                },
                "hash": {
                    "value": "4e04a8e140f5db06091727d10c98d8b9bde32f7291dcb48203634c88473c1d3f",
                    "algo": "sha-256",
                },
            }],
        },
        "cloudflareCdnId": "a0969136c231b5f901ba69a01f017c12",
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0x1Ac85C299aB35E3dd768F39cA76Ba1bAC56d28f5" : "0xb6617f457b33e02e6bdd973c29376a192a5b0908",
        "tokenId": "0",
        "contractType": "ERC1155",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": 5.55,
        "slug": "stone-eacc"
    },
    {
        "uuid": "c69004dd-e6e3-42c3-b0e1-d8def81a273d",
        "contractCreator": "0x7af35AACf09082a535119c18E2a565BA947C5B40",
        "collectionName": "Stones",
        showCollection: false,
        "metadata": {
            "id": "1",
            "name": "Stone: Safety",
            "description": "Technology was born three million years ago, when prehuman species in the Olduvai Gorge in modern day Tanzania first started using stone tools. These stones, modest though they may seem, are the first link in the daisy chain reaction which led us to the industrial revolution, nuclear weapons, the internet, and artificial intelligence - a daisy chain which extends far beyond us, beyond an unseeable horizon, and into an invisible future. Technology is inseparable from culture: it is not for nothing that the word 'techne' in Greek, from which the word technology derives, means 'art and craft'. Together, technological and cultural evolution form the double helix of human history - dancing forward together indomitably into eternity. Whether it be a dance of joy or a Danse Macabre, it all begins with the stone.\n\n'Stones' - the second artwork by the Autonomous Culture Research Bureau, examines these artefacts with detachment and objectivity, from the standpoint of a museum at the end of history - the Angel of History at the conclusion of the double helix.\n\nThe audiovisual work consists of two bespoke revolving 3D-modelled flint stones, marked 'e/acc' and 'safety', respectively representing techno-utopianism and techno-pessimism. They are the flints that Prometheus steals from the gods to make fire. The techno-pessimist stone is carved with the eternal image of Prometheus chained to a rock, his liver being eaten by an eagle - his punishment for his hubris, and a more foreboding portent of man's future.\n\nThe music backing this 'safety' stone features a dark ominous soundtrack echoing from humanity's past as if heard in the distant barren future. Accompanied by a spoken word passage inspired by the deathly allure of the sirens in the Odyssey, as well as the contemporaneous eschatology of Eliezer Yudkowsky, Geoffrey Hinton and others, it augurs man's destruction by artificial intelligence. Whether to believe the warnings from humanity's past is left as an exercise to the reader.\n\nThe works are the first by the Autonomous Culture Research Bureau in what will be a series of works examining technology and culture from this perspective - of the museum at the end of history. From the interaction of these first two stones, presented as ERC-1155 projects, and other Modularian artefacts, Phase II of the project will be born.",
            "image": "ipfs://bafybeibrukzooboy4nyjmlmealrpuw3llb3a57rtgcgbphcnbgxfofsplu",
            "animation_url": "ipfs://bafybeietrvbwkbscal7bdcv7gjmsqlfxhcufvk3deg4mmxhp5ntbu7s2gy",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://bafybeietrvbwkbscal7bdcv7gjmsqlfxhcufvk3deg4mmxhp5ntbu7s2gy",
                "mime_type": "video/mp4",
                "file_size": 51450043,
                "dimensions": {
                    "value": "2048x2048",
                    "unit": "px"
                },
                "hash": {
                    "value": "75ffb569265fa8f4f2ba9a2e75fd0d1c6e07c84bc345066026a335ea752fa28a",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://bafybeibrukzooboy4nyjmlmealrpuw3llb3a57rtgcgbphcnbgxfofsplu",
                "mime_type": "image/webp",
                "file_size": 1506576,
                "dimensions": {
                    "value": "400x400",
                    "unit": "px"
                },
                "hash": {
                    "value": "6b9e2e0a0b16e5216670407b874cf8dcf519ae6963a0f339d866d537025002b3",
                    "algo": "sha-256",
                },
            }],
        },
        "cloudflareCdnId": "96f594b745789cee78d01176f6b981b4",
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0x1Ac85C299aB35E3dd768F39cA76Ba1bAC56d28f5" : "0xb6617f457b33e02e6bdd973c29376a192a5b0908",
        "tokenId": "1",
        "contractType": "ERC1155",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": 0,
        "slug": "stone-safety"
    },
    {
        "uuid": "7447ef11-30ee-4bf6-8d4a-76a264fa7bff",
        "contractCreator": "0x40e46E07B71502D2D8d8285E2Ed1355CE966Ab9D",
        "collectionName": "Milo",
        showCollection: false,
        "metadata": {
            "id": "0",
            "name": "Milo",
            "description": "Milo is a special edition Fini whose moods reflect the price of TIA on a rolling 24-hour basis ✨",
            "image": "ipfs://bafybeif2b3oxb3wh7y4oc27lhnnhq3bdf6hhtzdronxpw2wzh7y5esee3y",
            "animation_url": "ipfs://bafybeibmo4nlxe7exv2fuxnoobgugdexlqxhzwkbchx6ylevcwbe43iqfq",
            "tags": [ "genesis", "modularium", "dynamic" ],
            "attributes": [
              { "trait_type": "Family", "value": "Celestia" },
              { "trait_type": "Name", "value": "Milo" },
              { "trait_type": "Mood", "value": "Happy" },
            ],
            "formats": [{
              "uri": "ipfs://bafybeibmo4nlxe7exv2fuxnoobgugdexlqxhzwkbchx6ylevcwbe43iqfq",
              "mime_type": "video/mp4",
              "file_size": 60833697,
              "dimensions": {
                  "value": "600x600",
                  "unit": "px"
              },
              "hash": {
                  "value": "40c0b4591c0c09cd187be0713210378849ac5e57c5c0269db1bbef9835283892",
                  "algo": "sha-256",
              },
            },{
              "uri": "ipfs://bafybeif2b3oxb3wh7y4oc27lhnnhq3bdf6hhtzdronxpw2wzh7y5esee3y",
              "mime_type": "image/webp",
              "file_size": 4717092,
              "dimensions": {
                  "value": "400x400",
                  "unit": "px"
              },
              "hash": {
                  "value": "7f6c84b8056cf17203dc3d41a882d456edce7fb17061575f28ac00dc6f569c20",
                  "algo": "sha-256",
              },
            }],
        },
        cloudflareCdnId: "6b7079d9455bc64aacd7668b120d3d8b",
        states: {
            happy: {
                metadata: {
                    "id": "0",
                    "name": "Milo",
                    "description": "Milo is a special edition Fini whose moods reflect the price of TIA on a rolling 24-hour basis ✨",
                    "image": "ipfs://bafybeif2b3oxb3wh7y4oc27lhnnhq3bdf6hhtzdronxpw2wzh7y5esee3y",
                    "animation_url": "ipfs://bafybeibmo4nlxe7exv2fuxnoobgugdexlqxhzwkbchx6ylevcwbe43iqfq",
                    "tags": [ "genesis", "modularium", "dynamic" ],
                    "attributes": [
                      { "trait_type": "Family", "value": "Celestia" },
                      { "trait_type": "Name", "value": "Milo" },
                      { "trait_type": "Mood", "value": "Happy" },
                    ],
                    "formats": [{
                      "uri": "ipfs://bafybeibmo4nlxe7exv2fuxnoobgugdexlqxhzwkbchx6ylevcwbe43iqfq",
                      "mime_type": "video/mp4",
                      "file_size": 60833697,
                      "dimensions": {
                          "value": "600x600",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "40c0b4591c0c09cd187be0713210378849ac5e57c5c0269db1bbef9835283892",
                          "algo": "sha-256",
                      },
                    },{
                      "uri": "ipfs://bafybeif2b3oxb3wh7y4oc27lhnnhq3bdf6hhtzdronxpw2wzh7y5esee3y",
                      "mime_type": "image/webp",
                      "file_size": 4717092,
                      "dimensions": {
                          "value": "400x400",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "7f6c84b8056cf17203dc3d41a882d456edce7fb17061575f28ac00dc6f569c20",
                          "algo": "sha-256",
                      },
                    }],
                },
                cloudflareCdnId: "6b7079d9455bc64aacd7668b120d3d8b",
            },
            sad: {
                metadata: {
                    "id": "0",
                    "name": "Milo",
                    "description": "Milo is a special edition Fini whose moods reflect the price of TIA on a rolling 24-hour basis ✨",
                    "image": "ipfs://bafybeiectbb3jjcc2pzst2vup3nwcjkepdtmy7pccyannwudjduqwr5wn4",
                    "animation_url": "ipfs://bafybeigf445adpmlowmzse4aoo3vqrojtrkjzqnnyhwtslht5e57atqele",
                    "tags": [ "genesis", "modularium", "dynamic" ],
                    "attributes": [
                      { "trait_type": "Family", "value": "Celestia" },
                      { "trait_type": "Name", "value": "Milo" },
                      { "trait_type": "Mood", "value": "Sad" },
                    ],
                    "formats": [{
                      "uri": "ipfs://bafybeigf445adpmlowmzse4aoo3vqrojtrkjzqnnyhwtslht5e57atqele",
                      "mime_type": "video/mp4",
                      "file_size": 57425593,
                      "dimensions": {
                          "value": "600x600",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "d9cec2cfb358dc81065eb30466b609c3b4b057f7f70088bbf04ed1007eca6753",
                          "algo": "sha-256",
                      },
                    },{
                      "uri": "ipfs://bafybeiectbb3jjcc2pzst2vup3nwcjkepdtmy7pccyannwudjduqwr5wn4",
                      "mime_type": "image/webp",
                      "file_size": 5246906,
                      "dimensions": {
                          "value": "400x400",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "e0e4b1327ff2b88e9951334477473cd585bd93aa15d423a90300979480d65123",
                          "algo": "sha-256",
                      },
                    }],
                },
                cloudflareCdnId: "d2901859019bc6aa0b2c6bdd19596b5b",
            },
            neutral: {
                metadata: {
                    "id": "0",
                    "name": "Milo",
                    "description": "Milo is a special edition Fini whose moods reflect the price of TIA on a rolling 24-hour basis ✨",
                    "image": "ipfs://bafybeibaahdieteawxje4say2igwphiffaqaf7ituoitppsdpfs72v26xi",
                    "animation_url": "ipfs://bafybeidb4gg5inrbmne5wk7t7tkrvptuag6muv3w6cmnx4xbqhyhpmbx4q",
                    "tags": [ "genesis", "modularium", "dynamic" ],
                    "attributes": [
                      { "trait_type": "Family", "value": "Celestia" },
                      { "trait_type": "Name", "value": "Milo" },
                      { "trait_type": "Mood", "value": "Neutral" },
                    ],
                    "formats": [{
                      "uri": "ipfs://bafybeidb4gg5inrbmne5wk7t7tkrvptuag6muv3w6cmnx4xbqhyhpmbx4q",
                      "mime_type": "video/mp4",
                      "file_size": 78872957,
                      "dimensions": {
                          "value": "600x600",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "8c95418e42e2fb4c4aa0be77dadd494f9183e8debb54061b8e2e37647f21d8b9",
                          "algo": "sha-256",
                      },
                    },{
                      "uri": "ipfs://bafybeibaahdieteawxje4say2igwphiffaqaf7ituoitppsdpfs72v26xi",
                      "mime_type": "image/webp",
                      "file_size": 6333234,
                      "dimensions": {
                          "value": "400x400",
                          "unit": "px"
                      },
                      "hash": {
                          "value": "952d7278d0ea41a4dec26b25bb63943def4a8f26c8343774acb960a2adec3317",
                          "algo": "sha-256",
                      },
                    }],
                },
                cloudflareCdnId: "089e223a427aa15a7994abb844870c7b",
            },
        },
        "type": "ERC721",
        "tokenAddress": isMainnet ? "0xc1A9c67117127c859789c20c4042c0CD87325861" : "0x2487a76723F010CDE2504f793205B4930e33fb0F",
        "tokenId": "0",
        "contractType": "ERC721",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": 0.33,
        "slug": "finis-milo",
    },
    {
        "uuid": "f1bb1a25-64ca-4544-992e-bd2ce75ebeaa",
        "contractCreator": "0xc955f47333802c9064d655af97552cd49a87d777",
        "collectionName": "Inertial Oscillation",
        showCollection: false,
        "metadata": {
            "id": "0",
            "name": "Inertial Oscillation",
            "description": "Based on electric voltage oscillations, and arranged using polyrhythms, Maelstrom's newest experiment is modular by nature, borrowing from various sources and shapes on its journey to the resolution of its own story line.",
            "image": "ipfs://bafybeiba74dtddmnk4wa3sxl7gsvac3ulmq5bijlezsc3hgphwfjjhyuna",
            "animation_url": "ipfs://bafybeienepw25r7rrx6vwtwsk7df7owbwadznooip5oob57sgmr2mq7hvy",
            "tags": [ "genesis", "modularium" ],
            "attributes": [
                { "trait_type": "Stems & High Fidelity WAV", "value": "https://file.io/iHI9UR6dFrjp" },
              ],
            "formats": [{
                "uri": "ipfs://bafybeienepw25r7rrx6vwtwsk7df7owbwadznooip5oob57sgmr2mq7hvy",
                "mime_type": "video/mp4",
                "file_size": 14438157,
                "dimensions": {
                    "value": "720x720",
                    "unit": "px"
                },
                "hash": {
                    "value": "7b818d5984dc064739a06ce809c0d32419cec727bad566aa7eab23aec46e5190",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://bafybeiba74dtddmnk4wa3sxl7gsvac3ulmq5bijlezsc3hgphwfjjhyuna",
                "mime_type": "image/jpeg",
                "file_size": 352963,
                "dimensions": {
                    "value": "1024x1024",
                    "unit": "px"
                },
                "hash": {
                    "value": "0f75ac0f4bb7f38ea182ab709f7203b6236c9e2a2aa466c51e76dfcd8b6252e9",
                    "algo": "sha-256",
                },
            }],
        },
        "cloudflareCdnId": "f4bd20ae62e92509d59fa5c77decf34b",
        "music": true,
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0x330491d0a7F74E9592CC6c5b2CE2a25e20206784" : "0xbc738cc95d2d35e29d4b999d3e5036f37edc7e55",
        "tokenId": "0",
        "contractType": "ERC1155",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": isMainnet ? 1 : 0.01,
        "slug": "inertial-oscillation"
    },
    {
        "uuid": "d6091f50-3882-4ec7-9961-ccd34ec26f95",
        "contractCreator": "0xD5Fa40f560a30A517db861e9C9E1e6bE200b13CA",
        "collectionName": "Burn Me",
        collectionDescription: "Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.",
        collectionImage: "/images/ipfs/Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.webp",
        showCollection: true,
        showMintAgain: true,
        startDate: new Date('2024-07-04T16:00:00Z'),
        "metadata": {
            "id": "0",
            "name": "Burn Me",
            "description": "Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.",
            "image": "ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.webp",
            "animation_url": "ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.mp4",
            "tags": ["genesis", "modularium"],
            "formats": [{
                "uri": "ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.mp4",
                "mime_type": "video/mp4",
                "file_size": 3494101,
                "dimensions": { "value": "1280x1280", "unit": "px" },
                "hash": { "value": "74cbb0b945581f08c80d6da59c1b34ff0432197b763da57d8f181e179e86d86d", "algo": "sha-256" },
            }, {
                "uri": "ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.webp",
                "mime_type": "image/webp",
                "file_size": 183474,
                "dimensions": { "value": "1280x1280", "unit": "px" },
                "hash": { "value": "1c3fdab623e106616a1b08e894acbf17a48a28c235a0440e9631f248b1511bb7", "algo": "sha-256" },
            }],
        },
        "cloudflareCdnId": "0c3929615a95877561554652c3183359",
        "music": true,
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0x460B1b0F69dEF9526DcE4E3e4B9754cfECe160be" : "0x77De4D1F147EA3863E80E4d08b5c3433892D0068",
        "tokenId": "0",
        "contractType": "ERC1155",
        "royalty": 750,
        "deployed": true,
        "created": true,
        "price": isMainnet ? 0.2 : 0.02,
        "priceTiers": isMainnet
            ? [
                { qty: 0, price: 0.2 },
                { qty: 5_001, price: 0.3 },
                { qty: 10_001, price: 0.4 },
                { qty: 15_001, price: 0.5 },
                { qty: 20_001, price: 0.6 },
                { qty: 25_001, price: 0.7 },
                { qty: 30_001, price: 0.8 },
                { qty: 35_001, price: 0.9 },
                { qty: 40_001, price: 1.0 },
            ] : [
                { qty: 0, price: 0.02 },
                { qty: 11, price: 0.03 },
                { qty: 21, price: 0.04 },
                { qty: 31, price: 0.05 },
                { qty: 41, price: 0.06 },
                { qty: 51, price: 0.07 },
                { qty: 61, price: 0.08 },
                { qty: 71, price: 0.09 },
                { qty: 81, price: 0.10 },
            ],
        "defaultMintAmount": 5,
        "overrideGas": (mintAmount: number) =>
            BigInt(mintAmount == 1 ? 275_000 : mintAmount == 2 ? 300_000 : mintAmount == 3 ? 400_000 : mintAmount == 4 ? 500_000 : mintAmount == 5 ? 600_000 : 1_000_000),
        "extraDetails": "Every 5,000 mints the price will increase by 0.1 TIA and cap at 1 TIA.\nE.g.: 0.2 TIA → 0.3 TIA → 0.4 TIA → 0.5 TIA, etc",
        "extraDescription": "\n\nDrop Rarity:\n\n0.01% (🔥🔥🔥🔥🔥)\n0.05% (🤝🤝🤝🤝🤝)\n0.1% (🔒🔒🔒🔒🔒)\n0.25% (🚜🚜🚜🚜🚜)\n0.5% (💰💰💰💰💰)\n1% (💨💨💨💨💨)\n98.09% Everything Else (6.54% each)",
        "slug": "burn-me",
        "tokens": [
            {"id":"0","rarity":"0.01","cloudflareCdnId":"0c3929615a95877561554652c3183359","name":"🔥🔥🔥🔥🔥","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.mp4","mime_type":"video/mp4","file_size":3494101,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"74cbb0b945581f08c80d6da59c1b34ff0432197b763da57d8f181e179e86d86d","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/0.webp","mime_type":"image/webp","file_size":183474,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"1c3fdab623e106616a1b08e894acbf17a48a28c235a0440e9631f248b1511bb7","algo":"sha-256"}}]},
            {"id":"1","rarity":"0.05","cloudflareCdnId":"6122edcea387b3434f8a666d12a5e078","name":"🤝🤝🤝🤝🤝","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/1.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/1.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/1.mp4","mime_type":"video/mp4","file_size":3608994,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"da66eacdd689f1630336d369842f940fe4e0708e82f2bde0ec454beea0520691","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/1.webp","mime_type":"image/webp","file_size":183936,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"613fe63ffa2fadfbe02d536037fcc5c6eaff0dc3a5b4dd5d9274fcccfe9ea9a6","algo":"sha-256"}}]},
            {"id":"2","rarity":"0.1","cloudflareCdnId":"f5d5c40355f2a804d3123d5abfe3de96","name":"🔒🔒🔒🔒🔒","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/2.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/2.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/2.mp4","mime_type":"video/mp4","file_size":4059651,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"7aed74aeebdf0ab00500022bdc1fa52939aa9591fef59103cc9b812238f2edbc","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/2.webp","mime_type":"image/webp","file_size":263708,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"e5e23aef6af6ecb6abb3988421332ed041c7888072426c0c0586345c2f6e9881","algo":"sha-256"}}]},
            {"id":"3","rarity":"0.25","cloudflareCdnId":"5db216b6f6233ebb9d339fff89b907ca","name":"🚜🚜🚜🚜🚜","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/3.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/3.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/3.mp4","mime_type":"video/mp4","file_size":3749325,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"1039d607a8bc5ae194601a1f647fdee38d2ce4a161fa525879a18cb7d5b886a7","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/3.webp","mime_type":"image/webp","file_size":205220,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"d015fb61f35ab6a6ecfb9a7944811266b9378f32d0a525f69430f5349480db6d","algo":"sha-256"}}]},
            {"id":"4","rarity":"0.5","cloudflareCdnId":"1f75df5263f021895dc2aaab3efb2db6","name":"💰💰💰💰💰","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/4.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/4.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/4.mp4","mime_type":"video/mp4","file_size":4324491,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"3a7d0e1378dc2c01c946c675eb9ba0a4fcd8803605c058f8ded2b451b6f73145","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/4.webp","mime_type":"image/webp","file_size":97398,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"037de50ce2ebef45b27f90e17b8dc2ec3ae6722d1fbf774fdb60cb2528098a72","algo":"sha-256"}}]},
            {"id":"5","rarity":"1.0","cloudflareCdnId":"1f5bdafd9eda451ff908c2bfad977cd1","name":"💨💨💨💨💨","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/5.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/5.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/5.mp4","mime_type":"video/mp4","file_size":3989998,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"ab1226b4b24893607a9159a8b80064826d36a56d60c33d3b90647b0235f2ab73","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/5.webp","mime_type":"image/webp","file_size":294172,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"736832097363020374e10b032af6642a37bb8938a6b593f9a9e4507fb1a0ed1e","algo":"sha-256"}}]},
            {"id":"6","rarity":"6.53","cloudflareCdnId":"f624928df63ba59b738df6e45b2c9481","name":"Burn Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/6.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/6.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/6.mp4","mime_type":"video/mp4","file_size":2944699,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"6482676f3445d3d0fddf603be84f6ff66272fd009eb1d815e7d81c471b5c05ff","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/6.webp","mime_type":"image/webp","file_size":118414,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"ed4b580ed109a0e031f34f652ea5db2b184f7211d3d7d5d419cac7da7f43ef05","algo":"sha-256"}}]},
            {"id":"7","rarity":"6.54","cloudflareCdnId":"5e7a1bfd37395379afc5e89541748ced","name":"Buy Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/7.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/7.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/7.mp4","mime_type":"video/mp4","file_size":3660260,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"fcee5a2b51aa07ca0b29965dd769b6022ca0924e774cee35f778ca7014ac44d9","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/7.webp","mime_type":"image/webp","file_size":240000,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"a40b69cf432e64796f42b2b51543a8ed4a53f815f3a06203f016a52b13222d64","algo":"sha-256"}}]},
            {"id":"8","rarity":"6.54","cloudflareCdnId":"6b0f3d05e3c3b7c21128b752baaeb91f","name":"Encrypt Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/8.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/8.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/8.mp4","mime_type":"video/mp4","file_size":3038268,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"8ad01abb71026e6a0957957aba61eca4fc59be0ed4043f00d0bf9a8fe6da55ce","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/8.webp","mime_type":"image/webp","file_size":90650,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"619d0b86e3eb48fbdb3b88959bc7cb3b729acd33c83dd01a68df6d47f72acadd","algo":"sha-256"}}]},
            {"id":"9","rarity":"6.54","cloudflareCdnId":"3e0e7f9023ed4aac9ce449fdcb700c07","name":"Farm Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/9.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/9.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/9.mp4","mime_type":"video/mp4","file_size":3598687,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"a13a07579b81519f9a36881dc03cee9950e755af4d59d68ab98ecdfc1486202a","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/9.webp","mime_type":"image/webp","file_size":181898,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"9dcabc1fab43ebacc3cf86853baf877b16747027ed56c0ff136a1f61166d68c5","algo":"sha-256"}}]},
            {"id":"10","rarity":"6.54","cloudflareCdnId":"685008762086efc218b638112e53dd34","name":"Generate Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/10.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/10.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/10.mp4","mime_type":"video/mp4","file_size":3646268,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"81d9c554e974675c648b84116b52b726072a140694cea9ff0b4e87c6ddb2d0ce","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/10.webp","mime_type":"image/webp","file_size":61632,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"4b3a048a1f568a2a7ee5e9d24889a559fa8fe1ca50038f95428a8f8d6ebbc200","algo":"sha-256"}}]},
            {"id":"11","rarity":"6.54","cloudflareCdnId":"74946e94b402b63a445993f1000f64e2","name":"Hold Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/11.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/11.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/11.mp4","mime_type":"video/mp4","file_size":3033062,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"8717974dd803b74bd8320b203552f1e07df2e42a979c0655217041b223d77034","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/11.webp","mime_type":"image/webp","file_size":148572,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"9708e9534eb6b28c05a57da5be54ded53a00acabe23fea5d56bf6ce01618afe7","algo":"sha-256"}}]},
            {"id":"12","rarity":"6.54","cloudflareCdnId":"49bd289a52018f13c29b660a535d6239","name":"Index Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/12.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/12.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/12.mp4","mime_type":"video/mp4","file_size":4152052,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"764ba036da5f4341e2a39fadb26eef1a55d9c508c4414c79d7d66e2c06364f61","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/12.webp","mime_type":"image/webp","file_size":298218,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"1f853c70a62a7f48f8c969d9484992a9cf520e78a9a3c241927ffb002c79587d","algo":"sha-256"}}]},
            {"id":"13","rarity":"6.54","cloudflareCdnId":"0289c1267bf0b30c6fef3fe65089dd5a","name":"Lock Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/13.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/13.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/13.mp4","mime_type":"video/mp4","file_size":4209788,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"fc042eb83d943b5e4f320b99442e18ecb5d411e576db83ae9ed1f1b14d729aa0","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/13.webp","mime_type":"image/webp","file_size":180448,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"96b75c68e9e7e7257b00d7528e1d349e30736d3d904455a09c16702bb5a7dae3","algo":"sha-256"}}]},
            {"id":"14","rarity":"6.54","cloudflareCdnId":"774519baa56b3ebb8278c420d33cfef4","name":"Merge Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/14.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/14.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/14.mp4","mime_type":"video/mp4","file_size":2965190,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"5c7b992e55e4d04a64a6054cc2ce45b2dcb31c194f2c20afe432d24d4f90d0e5","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/14.webp","mime_type":"image/webp","file_size":57724,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"5ceb607e19ca43e39c31cc36e45ef0260c0177bc0b3319efd059644c3d86b2d4","algo":"sha-256"}}]},
            {"id":"15","rarity":"6.54","cloudflareCdnId":"8d452eb14e34ff10a4b3c6b41d3ec54e","name":"Mint Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/15.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/15.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/15.mp4","mime_type":"video/mp4","file_size":3592612,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"2a43bf2af73e09fb7b1821e7b008c8b851332806dd2ba82925ab95bb62f73196","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/15.webp","mime_type":"image/webp","file_size":196370,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"220373c4dd869f7cd0aa3c14ef8a6d887f1e283bbda293b030bd38ce5801abb6","algo":"sha-256"}}]},
            {"id":"16","rarity":"6.54","cloudflareCdnId":"c17d5050e014b09b0cc4326f6f534dce","name":"Pay Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/16.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/16.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/16.mp4","mime_type":"video/mp4","file_size":4426928,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"a28b681af70266cade684f749303856b4a30ad5bca7e29be1d86883514a089d4","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/16.webp","mime_type":"image/webp","file_size":42042,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"d4a1f85db1fe5f62af00f9f0b713e1e72e2e78836d1f1d74871a5867f5940b6b","algo":"sha-256"}}]},
            {"id":"17","rarity":"6.54","cloudflareCdnId":"7f5014b0392ecb09570ca58b2c3a61a9","name":"Rug Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/17.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/17.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/17.mp4","mime_type":"video/mp4","file_size":2525251,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"b57aed62baf182a64da9a3c98e7c3339c95f7950f99ad2facb49e51b2be8b4f8","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/17.webp","mime_type":"image/webp","file_size":85890,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"f8c5cfaf1439bd4656fcc4c4ab43971734bb0afb5bfbf7d540c5b03454cbd9fc","algo":"sha-256"}}]},
            {"id":"18","rarity":"6.54","cloudflareCdnId":"f84437f16c3f03125a47e299a054393e","name":"Sell Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/18.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/18.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/18.mp4","mime_type":"video/mp4","file_size":4016073,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"125c61b7684d3cf73b2b5b17bfa2a786979c61a2aaf7cf215b6211f1668e7f78","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/18.webp","mime_type":"image/webp","file_size":310856,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"bf09665fbc3dbf81fbb14cb85075a02e4984bbb952ef4ca9b9871a61faf4d7d1","algo":"sha-256"}}]},
            {"id":"19","rarity":"6.54","cloudflareCdnId":"c152faf54ab63409100495224d2595e3","name":"Stake Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/19.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/19.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/19.mp4","mime_type":"video/mp4","file_size":4122802,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"5a2ed9e79c5bca587ca56f30a469f5b14ead04146d26dad31d6beb1d062f0428","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/19.webp","mime_type":"image/webp","file_size":311002,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"0c2289bb852b9d4c5c3fcd82021e2455d2e6331fc3e409222505b0af3cd030d6","algo":"sha-256"}}]},
            {"id":"20","rarity":"6.54","cloudflareCdnId":"e9c1175110d9ecfb791ea3724fd8a00a","name":"Validate Me","description":"Burn Me is an open edition NFT project featuring 21 unique images, each paired with an AI-generated .mp3 cover of Daft Punk's \"Technologic.\" This version uses crypto terms and changes the song's focus from \"It\" to \"Me,\" highlighting the social nature of blockchain transactions. Each image includes phrases like \"Validate Me,\" \"Burn Me,\" \"Pay Me,\" and \"Hold Me\" with a mix of retro and futuristic styles. Some images are purely graphic, while rarer ones include representational visuals in the background.","image":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/20.webp","animation_url":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/20.mp4","tags":["genesis","modularium"],"formats":[{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/20.mp4","mime_type":"video/mp4","file_size":4483928,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"ab48ac11e2898bf36c9c9a29272ca4d4408e64ef35314ad5519025d7f2fae818","algo":"sha-256"}},{"uri":"ipfs://Qmd8Jnu5SYnVakVUwSutU2b2RosupUQvsotLmdWrvmcYcM/20.webp","mime_type":"image/webp","file_size":52210,"dimensions":{"value":"1280x1280","unit":"px"},"hash":{"value":"802e75dd11ba6bd949a5343be6b41afb6c8085514dc058dbc73fd6815f769d30","algo":"sha-256"}}]},
        ],
    },
    {
        "uuid": "1ba71aa2-83c6-4f75-b352-2a3ba467ca2d",
        "contractCreator": "0xDaF8208B2b11FEbc4f92506Ab03Ced784827a21a",
        "collectionName": "The Work of Art in the Age of Immutable Cryptography: A memento",
        showCollection: false,
        hidden: true,
        extraDetails: "Connect with the email you used to register for the event.",
        "metadata": {
            "id": "0",
            "name": "The Work of Art in the Age of Immutable Cryptography: A memento",
            "description": `The NFT was heralded by many as the return of the presence and aura associated with localised artworks prior to the age of their mechanical reproduction; and many thus welcomed an age of digital scarcity and a new renaissance. Cynics argue that instead what we got was speculation in the place of (rather than alongside) the artwork, artists acting as community managers and a desert of broken hashes and links. Independently of whether or not this is an accurate diagnosis, cryptoart did not begin nor end with the NFT.\n\nCryptography allows for persistent, autonomous and valuable digital objects and processes that closely resemble physical ones in their objectivity - how can these factors function not just as distributive rails but also as art supplies for a class of artworks that would have been impossible without them? How would these artworks resist, embrace or converse with their financialization in novel ways? If the blockchain is the medium, then is the NFT and the smart contract too constraining a canvas, and is the VM and the chain itself the properly expressive building block? Do both artworks and games converge into autonomous golems?\n\nThis NFT is a memento of the event hosted by Aura in the Vanhaerents Art Collection on the 9th of July in Brussels, with the kind support of Privy and Dora.`,
            "image": "ipfs://QmacHXEsxPQkzyh2XufvKpo5TFGqtSKaavqGBbTUvdHGEW",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://QmacHXEsxPQkzyh2XufvKpo5TFGqtSKaavqGBbTUvdHGEW",
                "mime_type": "image/png",
                "file_size": 559946,
                "dimensions": {
                    "value": "480x600",
                    "unit": "px"
                },
                "hash": {
                    "value": "fb51baf1ad112963e403867222d74253301569c551b11fcfb766b51185a1f4ef",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://QmVAE9mhiZHmTPxoWpdjnNsjjrLFb7tJjkw5AZzJw6zJov",
                "mime_type": "image/png",
                "file_size": 3048050,
                "dimensions": {
                    "value": "1080x1350",
                    "unit": "px"
                },
                "hash": {
                    "value": "4fddbadae89c04b8df7e1007740cd9254eb56877b58fd478d83fd00420312b07",
                    "algo": "sha-256",
                },
            }],
        },
        "music": false,
        "type": "ERC1155",
        "tokenAddress": isMainnet ? "0x7b69fad7a6975ff5a34c06adc00e447ce24d2fc3" : "0xa230f012ffc26c332460c71a203aea29cc70f08d",
        "tokenId": "0",
        "contractType": "ERC1155",
        "royalty": 0,
        "deployed": true,
        "created": true,
        "price": 0,
        "slug": "auraevent",
        "merkleRoot": "0xa5e6f259ac4883c11433745029441d9bd07385ad5aff66546a236c694e050584",
        "merkleTree": AurasMerkleTree,
    },
    {
        uuid: "5544ae71-0799-4ae2-bf76-1e972229f90b",
        contractCreator: "",
        collectionName: ">celestia_light_start",
        showCollection: false,
        hidden: true,
        extraDetails: "Connect with the email you used to register for the event.",
        metadata: {
            "id": "0",
            "name": ">celestia_light_start",
            "description": `Have you ever wondered what data availability sampling looks like? Now you know.\n\nArtefact available to those who ran a light node during Modular Summit 2024 in Brussels.`,
            "image": "ipfs://QmW6e2ScVbjveVUr2xcQq1dgeChXMup8LRcNVkrvSBAWHL",
            "animation_url": "ipfs://QmT5jzbYUbH4Tb4w8PTL5VSAWD57YgDXCseoRkR9WoMsPs",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://QmT5jzbYUbH4Tb4w8PTL5VSAWD57YgDXCseoRkR9WoMsPs",
                "mime_type": "video/mp4",
                "file_size": 263852997,
                "dimensions": {
                    "value": "4096x4096",
                    "unit": "px"
                },
                "hash": {
                    "value": "17b18734c6a90b191d2e8f4199c4db6c924a90658bb756ae335331c3d753bf5b",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://QmW6e2ScVbjveVUr2xcQq1dgeChXMup8LRcNVkrvSBAWHL",
                "mime_type": "image/webp",
                "file_size": 7829256,
                "dimensions": {
                    "value": "400x400",
                    "unit": "px"
                },
                "hash": {
                    "value": "949f24bba282cf9c94094ba66b5d3eb8bcbd73ba2b826c7e626c69bb2c242051",
                    "algo": "sha-256",
                },
            }],
        },
        useCdn: true,
        cloudflareCdnId: "6137222bcdde106a49c63cccc7377eba",
        music: true,
        type: "ERC1155",
        tokenAddress: isMainnet ? "0xa5f005314b182a9ac2b90e7412be72ccf0f292fc" : "0x41d73e10ef51ff8c91645ef731eeac716d857f2c",
        tokenId: "0",
        contractType: "ERC1155",
        royalty: 0,
        deployed: true,
        created: true,
        price: 0,
        slug: "modularsummit",
        merkleRoot: isMainnet ? "0x3e026e5c29d6aa1ada0c4b4a363ecda990a957e58260e401f031b36dd765d933" : "0xea956316e79b92126e1a67b3ce4fa5acf049a424a822798280a68497036d600f",
        merkleTree: ModSummitMerkleTree,
        overrideGas: () => BigInt(250_000),
    },
    {
        uuid: "a5deab92-3399-4416-bb97-9960701f15b4",
        contractCreator: "0x22230D9789B737627FC64a667A49aBBed44cdDc0",
        collectionName: "Slothgang of Athens",
        showCollection: false,
        hidden: false,
        metadata: {
            "id": "0",
            "name": "Slothgang of Athens",
            "description": `"Knowing yourself is the beginning of all wisdom." - Arislothle`,
            "image": "ipfs://Qmc78jmkQzKdmai15XyNps6MUczbgSNdPw6SkMmdno8Fk6",
            "tags": [ "genesis", "modularium" ],
            "formats": [{
                "uri": "ipfs://QmcFPnutLwqeShG2EXKkL9JGhR9wZyXfPMdN3MnqRTAKPN",
                "mime_type": "image/jpeg",
                "file_size": 1210663,
                "dimensions": {
                    "value": "3072x1728",
                    "unit": "px"
                },
                "hash": {
                    "value": "a200f97d1aedd6ebaa1a35410eb204733473a24407a253da8e4d9de5a6ac770b",
                    "algo": "sha-256",
                },
            },{
                "uri": "ipfs://Qmc78jmkQzKdmai15XyNps6MUczbgSNdPw6SkMmdno8Fk6",
                "mime_type": "image/jpeg",
                "file_size": 119555,
                "dimensions": {
                    "value": "800x450",
                    "unit": "px"
                },
                "hash": {
                    "value": "45c5dd0a31672f9670959588b73799d1ca6398bb3951d8ff4f4c38fad84c0993",
                    "algo": "sha-256",
                },
            }],
        },
        music: false,
        type: "ERC1155",
        tokenAddress: isMainnet ? "0x96971371a6f266f074d18f3c3ab7b77c5489923d" : "0xfb5e2491582b96100be5eec673943bd5af7f0c5f",
        tokenId: "0",
        contractType: "ERC1155",
        royalty: 750,
        deployed: true,
        created: true,
        price: 0,
        slug: "alothgang-of-athens",
        merkleRoot: "0x45b9c12143f65609894c40520152b77d5450da2fe2d25d706de1e499803140a9",
        merkleTree: SlothFreeTree,
        overrideGas: () => BigInt(250_000),
    },
    {
        uuid: "20b704b1-0d52-4462-a086-3f90c9dea8f8",
        contractCreator: "0x22230D9789B737627FC64a667A49aBBed44cdDc0",
        collectionName: "Habitats",
        collectionDescription: "Serene...Habitats...For...Lazy...Sloths",
        collectionImage: "/images/collections/habitats.jpg",
        showCollection: true,
        showMintAgain: false,
        startDate: new Date('2024-07-11T15:00:00Z'),
        hidden: false,
        metadata: {
            "id": "0",
            rank: 0,
            "name": "Habitats",
            "description": `Serene...Habitats...For...Lazy...Sloths`,
            "image": "/images/upcoming-drops/habitats.jpg",
            "attributes":[
                {"trait_type":"Backdrops","value":"?"},
                {"trait_type":"Blossoms","value":"?"},
                {"trait_type":"Canopy","value":"?"},
                {"trait_type":"Fauna","value":"?"},
                {"trait_type":"Forest","value":"?"},
                {"trait_type":"Laziness","value":"?"},
                {"trait_type":"Sky creatures","value":"?"},
                {"trait_type":"Terrain","value":"?"},
                {"trait_type":"Trunk","value":"?"},
                {"trait_type":"Understory","value":"?"},
                {"trait_type":"Weather","value":"?"}
            ],
        },
        tokens: HabitatTokens as Array<any>,
        music: false,
        type: "ERC721",
        tokenAddress: isMainnet ? "0xEA30F63e08a0B01F8BCBE62037Ef810fBDB340Dc" : "0x16cd8DB7c97F4590C867b7fe7853a85D46311410",
        tokenId: "0",
        contractType: "ERC721",
        royalty: 750,
        deployed: true,
        created: true,
        price: isMainnet ? 3 : 0.3,
        slug: "habitats",
        merkleRoots: [
            { root: "0x45b9c12143f65609894c40520152b77d5450da2fe2d25d706de1e499803140a9", tree: SlothFreeTree },
            { root: "0x7d66407acd7b8825e7367f223e0d4596510e96a98dda21a75de0067b67253079", tree: SlothPaidTree },
        ],
        overrideGas: () => BigInt(300_000),
    },
];

export type ContractAddress = {
    address: string;
    tokenId: string;
    type: string;
};

export let contractAddresses: ContractAddress[] = [];
for (const nft of nfts) {
    if (nft.created && nft.tokenAddress) {
        contractAddresses.push({ address: nft.tokenAddress?.toLowerCase(), tokenId: nft.tokenId, type: nft.type });
    }
}
contractAddresses.reverse();
