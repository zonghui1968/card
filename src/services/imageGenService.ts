import { googleAIService } from './googleAIService';

/**
 * 图片生成服务
 * 支持使用Google的Imagen模型生成图片
 */
export class ImageGenerationService {
    private apiKey: string | null = null;

    constructor() {}

    /**
     * 设置API Key
     */
    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * 使用Google的Imagen生成图片
     * 注意：这需要Vertex AI API访问权限
     */
    async generateImageWithImagen(prompt: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error('请先设置API Key');
        }

        try {
            // 使用Vertex AI Imagen API
            // 注意：这需要启用Vertex AI API并使用正确的端点
            const response = await fetch(
                `https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        instances: [{
                            prompt: prompt
                        }],
                        parameters: {
                            sampleCount: 1,
                            aspectRatio: "4:3",
                            safetyFilterLevel: "block_some"
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.statusText}`);
            }

            const data = await response.json();
            // 解析返回的图片数据
            if (data.predictions && data.predictions[0]) {
                return data.predictions[0].bytesBase64Encoded;
            }

            throw new Error('无法解析图片数据');
        } catch (error) {
            console.error('使用Imagen生成图片失败:', error);
            throw error;
        }
    }

    /**
     * 使用AI生成图片提示词
     * 然后使用外部图片生成服务生成图片
     */
    async generateImageForCard(cardType: string, theme?: string): Promise<string> {
        try {
            // 使用Gemini生成详细的图片描述
            const description = await googleAIService.generateImageDescription(cardType, theme);

            // 由于Imagen API需要特殊配置，这里使用备选方案：
            // 返回一个基于关键词的高质量图片URL
            return this.getHighQualityImageUrl(cardType, description);
        } catch (error) {
            console.error('生成图片失败:', error);
            // 返回默认图片
            return this.getDefaultImageUrl(cardType);
        }
    }

    /**
     * 获取高质量图片URL（使用Unsplash等免费图库）
     * 基于卡片类型和AI生成的描述
     */
    private getHighQualityImageUrl(cardType: string, description: string): string {
        // 从描述中提取关键词
        const keywords = this.extractKeywords(description, cardType);

        // 使用Unsplash API获取相关图片
        const unsplashUrl = `https://source.unsplash.com/800x450/?${keywords}&sig=${Math.random()}`;

        return unsplashUrl;
    }

    /**
     * 从描述中提取关键词
     */
    private extractKeywords(description: string, cardType: string): string {
        const typeKeywords: Record<string, string> = {
            greeting: 'celebration,flowers,love',
            invitation: 'party,elegant,celebration',
            birthday: 'birthday,cake,balloons',
            postcard: 'travel,landscape,scenery',
            business: 'office,professional,modern',
            thankyou: 'flowers,gratitude,appreciation',
            celebration: 'confetti,fireworks,party',
            memorial: 'candles,memorial,peaceful',
            love: 'hearts,romantic,flowers'
        };

        return typeKeywords[cardType] || 'celebration';
    }

    /**
     * 获取默认图片URL
     */
    private getDefaultImageUrl(cardType: string): string {
        const defaults: Record<string, string> = {
            greeting: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800&h=450',
            invitation: 'https://images.unsplash.com/photo-1519671482502-9759101d4574?auto=format&fit=crop&q=80&w=800&h=450',
            birthday: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=800&h=450',
            postcard: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800&h=450',
            business: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=450',
            thankyou: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&q=80&w=800&h=450',
            celebration: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800&h=450',
            memorial: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=800&h=450',
            love: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800&h=450'
        };

        return defaults[cardType] || defaults.greeting;
    }

    /**
     * 清除API Key
     */
    clearApiKey() {
        this.apiKey = null;
    }
}

// 导出单例
export const imageGenerationService = new ImageGenerationService();
