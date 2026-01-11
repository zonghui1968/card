// 智谱AI服务类
// 使用智谱AI的GLM模型生成文本和图片

export interface ZhipuGeneratedMessage {
    title: string;
    message: string[];
    signature: string;
}

export class ZhipuAIService {
    private apiKey: string | null = null;
    private baseURL: string = "https://open.bigmodel.cn/api/paas/v4";

    constructor() {}

    /**
     * 设置API Key
     */
    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * 检查是否已初始化
     */
    private isInitialized(): boolean {
        return this.apiKey !== null;
    }

    /**
     * 生成JWT Token（智谱AI需要）
     * 注意：在实际使用中，这需要在服务端完成以保护API Key
     * 这里仅作为示例，客户端使用时需要从后端获取token
     */
    private async generateToken(): Promise<string> {
        if (!this.apiKey) {
            throw new Error('API Key未设置');
        }

        // 简单实现：直接使用API Key
        // 在生产环境中，应该在服务端生成JWT token
        return this.apiKey;
    }

    /**
     * 生成卡片祝福语
     * @param cardType 卡片类型
     * @param customPrompt 自定义提示（可选）
     */
    async generateCardMessage(
        cardType: string,
        customPrompt?: string
    ): Promise<ZhipuGeneratedMessage> {
        if (!this.isInitialized()) {
            throw new Error('智谱AI未初始化，请先设置API Key');
        }

        const cardTypeNames: Record<string, string> = {
            greeting: "祝福贺卡",
            invitation: "邀请函",
            birthday: "生日贺卡",
            postcard: "明信片",
            business: "商务名片",
            thankyou: "感谢卡",
            celebration: "庆祝贺卡",
            memorial: "纪念卡",
            love: "情书"
        };

        const prompt = customPrompt || `请为一张${cardTypeNames[cardType] || "贺卡"}生成内容。

要求：
1. 生成一个简短标题（4-8字）
2. 生成2-3条相关语句（每条10-20字）
3. 生成一个署名（2-6字）

请以JSON格式返回，格式如下：
{
    "title": "标题",
    "message": ["第一句", "第二句", "第三句"],
    "signature": "署名"
}

只返回JSON，不要其他内容。`;

        try {
            const token = await this.generateToken();

            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'glm-4-flash',  // 使用GLM-4 Flash模型（快速且经济）
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`智谱AI API错误: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();

            if (data.choices && data.choices[0] && data.choices[0].message) {
                const content = data.choices[0].message.content;

                // 解析JSON响应
                let cleanedText = content
                    .replace(/```json\n?/g, '')
                    .replace(/```\n?/g, '')
                    .trim();

                // 尝试提取JSON部分（如果包含其他文字）
                const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    cleanedText = jsonMatch[0];
                }

                try {
                    const generated = JSON.parse(cleanedText);
                    return {
                        title: generated.title || '美好祝愿',
                        message: Array.isArray(generated.message)
                            ? generated.message
                            : typeof generated.message === 'string'
                                ? [generated.message]
                                : ['美好的祝福送给你'],
                        signature: generated.signature || '祝福'
                    };
                } catch (parseError) {
                    console.error('JSON解析失败，原始内容:', content);
                    console.error('清理后内容:', cleanedText);
                    console.error('解析错误:', parseError);

                    // 如果JSON解析失败，尝试从文本中提取信息
                    const lines = content.split('\n').filter(l => l.trim());
                    const title = lines.find(l => l.includes('标题') || l.includes('title'))?.split(/[:：]/)[1]?.trim() || '美好祝愿';
                    const signature = lines.find(l => l.includes('署名') || l.includes('signature'))?.split(/[:：]/)[1]?.trim() || '祝福';

                    // 提取消息部分
                    const messageLines = lines.filter(l =>
                        !l.includes('标题') &&
                        !l.includes('title') &&
                        !l.includes('署名') &&
                        !l.includes('signature') &&
                        !l.includes('```') &&
                        l.trim().length > 0
                    );

                    const messages = messageLines.length > 0
                        ? messageLines.slice(0, 3).map(l => l.replace(/^["'】]\s*/, '').replace(/["'】]\s*$/, '').trim())
                        : ['美好的祝福送给你'];

                    return {
                        title,
                        message: messages.length > 0 ? messages : ['美好的祝福送给你'],
                        signature
                    };
                }
            }

            throw new Error('AI返回数据格式错误');
        } catch (error) {
            console.error('智谱AI生成祝福语失败:', error);
            throw error;
        }
    }

    /**
     * 生成图片描述
     * @param cardType 卡片类型
     * @param theme 主题描述
     */
    async generateImageDescription(
        cardType: string,
        theme?: string
    ): Promise<string> {
        if (!this.isInitialized()) {
            throw new Error('智谱AI未初始化，请先设置API Key');
        }

        const cardTypeNames: Record<string, string> = {
            greeting: "祝福贺卡",
            invitation: "邀请函",
            birthday: "生日贺卡",
            postcard: "明信片",
            business: "商务名片",
            thankyou: "感谢卡",
            celebration: "庆祝贺卡",
            memorial: "纪念卡",
            love: "情书"
        };

        const prompt = `请为一张${cardTypeNames[cardType] || "贺卡"}卡片生成一个精美的画面描述。
${theme ? `主题：${theme}` : ''}
要求：描述应该生动、具体，适合作为AI绘画的提示词（英文，50词以内）。
只返回描述文字，不要其他内容。`;

        try {
            const token = await this.generateToken();

            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'glm-4-flash',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });

            if (!response.ok) {
                throw new Error(`智谱AI API错误: ${response.status}`);
            }

            const data = await response.json();

            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content.trim();
            }

            throw new Error('AI返回数据格式错误');
        } catch (error) {
            console.error('智谱AI生成图片描述失败:', error);
            throw error;
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
    ): Promise<ZhipuGeneratedMessage[]> {
        const messages: ZhipuGeneratedMessage[] = [];

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
    }
}

// 导出单例
export const zhipuAIService = new ZhipuAIService();
