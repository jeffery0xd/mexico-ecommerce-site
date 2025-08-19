-- 添加banner_settings表，用于存储网站Banner的设置
-- 该表支持设置标题，副标题，背景图片，背景颜色和文字颜色
-- 字段 is_active 标记当前活跃的Banner

-- 引用banner_settings表定义
\i supabase/tables/banner_settings.sql
