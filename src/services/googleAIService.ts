import { GoogleGenerativeAI } from '@google/generative-ai';

// 卡片类型对应的祝福语生成提示词
const CARD_TYPE_PROMPTS: Record<string, string> = {
    greeting: "温暖、真诚的生日祝福",
    invitation: "正式、优雅的邀请函文案",
    birthday: "欢快、温馨的生日祝福",
    postcard: "轻松、愉快的旅行见闻",
    business: "专业、简洁的商务介绍",
    thankyou: "真诚、温暖的感谢语",
    celebration: "热烈、喜庆的庆祝词",
    memorial: "庄重、深切的缅怀语",
    love: "浪漫、深情的情书内容"
};

export interface GeneratedMessage {
    title: string;
    message: string[];
    signature: string;
}

export interface GeneratedImage {
    imageUrl: string;
    description: string;
}

/**
 * Google AI 服务类
 * 用于生成祝福语和图片
 */
export class GoogleAIService {
    private genAI: GoogleGenerativeAI | null = null;
    private apiKey: string | null = null;

    constructor() {}

    /**
     * 设置API Key并初始化客户端
     */
    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    /**
     * 检查是否已初始化
     */
    private isInitialized(): boolean {
        return this.genAI !== null && this.apiKey !== null;
    }

    /**
     * 生成卡片祝福语
     * @param cardType 卡片类型
     * @param customPrompt 自定义提示（可选）
     */
    async generateCardMessage(
        cardType: string,
        customPrompt?: string
    ): Promise<GeneratedMessage> {
        if (!this.isInitialized() || !this.genAI) {
            throw new Error('Google AI 未初始化，请先设置 API Key');
        }

        const prompt = customPrompt || CARD_TYPE_PROMPTS[cardType] || CARD_TYPE_PROMPTS.greeting;

        try {
            const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

            const fullPrompt = `请为一张${prompt}卡片生成内容。
要求：
1. 生成一个简短标题（4-8字）
2. 生成2-3条祝福/邀请/感谢语（每条10-20字）
3. 生成一个署名（2-6字）

请以JSON格式返回，格式如下：
{
    "title": "标题",
    "message": ["第一句", "第二句", "第三句"],
    "signature": "署名"
}

只返回JSON，不要其他内容。`;

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            // 解析JSON响应
            const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const generated = JSON.parse(cleanedText);

            return {
                title: generated.title || '美好祝愿',
                message: Array.isArray(generated.message) ? generated.message : [generated.message],
                signature: generated.signature || '祝福'
            };
        } catch (error) {
            console.error('生成祝福语失败:', error);
            throw new Error('AI生成祝福语失败，请检查API Key');
        }
    }

    /**
     * 生成图片描述（用于图片生成）
     * @param cardType 卡片类型
     * @param theme 主题描述
     */
    async generateImageDescription(
        cardType: string,
        theme?: string
    ): Promise<string> {
        if (!this.isInitialized() || !this.genAI) {
            throw new Error('Google AI 未初始化，请先设置 API Key');
        }

        try {
            const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

            const prompt = `请为一张${CARD_TYPE_PROMPTS[cardType] || CARD_TYPE_PROMPTS.greeting}卡片生成一个精美的画面描述。
${theme ? `主题：${theme}` : ''}
要求：描述应该生动、具体，适合作为AI绘画的提示词（英文，50词以内）。
只返回描述文字，不要其他内容。`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.error('生成图片描述失败:', error);
            throw new Error('AI生成图片描述失败');
        }
    }

    /**
     * 批量生成多个祝福语选项
     * @param cardType 卡片类型
     * @param count 生成数量
     */
    async generateMultipleMessages(
        cardType: string,
        count: number = 3
    ): Promise<GeneratedMessage[]> {
        const messages: GeneratedMessage[] = [];

        for (let i = 0; i < count; i++) {
            try {
                const message = await this.generateCardMessage(cardType);
                messages.push(message);
            } catch (error) {
                console.error(`生成第${i + 1}条祝福语失败:`, error);
            }
        }

        return messages;
    }

    /**
     * 清除API Key
     */
    clearApiKey() {
        this.apiKey = null;
        this.genAI = null;
    }
}

// 导出单例
export const googleAIService = new GoogleAIService();
