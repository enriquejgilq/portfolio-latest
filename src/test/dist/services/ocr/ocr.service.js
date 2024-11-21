"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCRService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const lodash = require("lodash");
let OCRService = class OCRService {
    async OcrImage(fileBuffer, rif) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        const textract = new AWS.Textract();
        let detectParameter = {
            Document: {
                Bytes: fileBuffer,
            },
            FeatureTypes: ['FORMS', 'TABLES'],
        };
        if (rif) {
            detectParameter.FeatureTypes = ['FORMS'];
        }
        try {
            const request = await textract.analyzeDocument(detectParameter).promise();
            return this.processTextractResponse(request, rif);
        }
        catch (error) {
            console.error('Error al procesar la imagen con Textract:', error);
            throw new Error('Error al procesar la imagen: ' + error.message);
        }
    }
    processTextractResponse(data, rif) {
        if (data && data.Blocks) {
            if (rif) {
                const textLines = data.Blocks.filter((block) => block.BlockType === 'LINE');
                textLines.sort((a, b) => a.Geometry.BoundingBox.Top - b.Geometry.BoundingBox.Top);
                let linesComplete = [];
                textLines.forEach((line) => linesComplete.push(line.Text));
                return linesComplete;
            }
            const { keyMap, valueMap, blockMap } = this.getKeyValueMap(data.Blocks);
            const keyValues = this.getKeyValueRelationship(keyMap, valueMap, blockMap);
            return keyValues;
        }
        return {};
    }
    getText(result, blocksMap) {
        let text = '';
        if (lodash.has(result, 'Relationships')) {
            result.Relationships.forEach((relationship) => {
                if (relationship.Type === 'CHILD') {
                    relationship.Ids.forEach((childId) => {
                        const word = blocksMap[childId];
                        if (word.BlockType === 'WORD') {
                            text += `${word.Text} `;
                        }
                        if (word.BlockType === 'SELECTION_ELEMENT') {
                            if (word.SelectionStatus === 'SELECTED') {
                                text += `Selected `;
                            }
                        }
                    });
                }
            });
        }
        return text.trim();
    }
    findValueBlock(keyBlock, valueMap) {
        let valueBlock;
        keyBlock.Relationships.forEach((relationship) => {
            if (relationship.Type === 'VALUE') {
                relationship.Ids.every((valueId) => {
                    if (lodash.has(valueMap, valueId)) {
                        valueBlock = valueMap[valueId];
                        return false;
                    }
                });
            }
        });
        return valueBlock;
    }
    getKeyValueRelationship(keyMap, valueMap, blockMap) {
        const keyValues = {};
        const keyMapValues = lodash.values(keyMap);
        keyMapValues.forEach((keyMapValue) => {
            const valueBlock = this.findValueBlock(keyMapValue, valueMap);
            const key = this.getText(keyMapValue, blockMap);
            const value = this.getText(valueBlock, blockMap);
            keyValues[key] = value;
        });
        return keyValues;
    }
    getKeyValueMap(blocks) {
        const keyMap = {};
        const valueMap = {};
        const blockMap = {};
        let blockId;
        blocks.forEach((block) => {
            blockId = block.Id;
            blockMap[blockId] = block;
            if (block.BlockType === 'KEY_VALUE_SET') {
                if (lodash.includes(block.EntityTypes, 'KEY')) {
                    keyMap[blockId] = block;
                }
                else {
                    valueMap[blockId] = block;
                }
            }
        });
        return { keyMap, valueMap, blockMap };
    }
};
exports.OCRService = OCRService;
exports.OCRService = OCRService = __decorate([
    (0, common_1.Injectable)()
], OCRService);
//# sourceMappingURL=ocr.service.js.map