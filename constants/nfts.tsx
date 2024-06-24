import { isMainnet } from "./details";

import FinisMerkleTree from "./merkle/finis-tree.json";

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
        "merkleRoot": "0x219629712cded50c2af084a9c2601a138c554042b6aaf88bfaaa10d05a87b217",
        "merkleTree": FinisMerkleTree,
    },
    {
        "uuid": "f1bb1a25-64ca-4544-992e-bd2ce75ebeaa",
        "contractCreator": "0xc955f47333802c9064d655af97552cd49a87d777",
        "collectionName": "Inertial Oscillation",
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