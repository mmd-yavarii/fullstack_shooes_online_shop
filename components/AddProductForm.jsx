import { Paper, Typography, TextField, Box, MenuItem, Button, Switch, FormControlLabel, Divider } from '@mui/material';
import UploadImg from '@/components/uploadImg';

export default function AddProductForm({
    form,
    setForm,
    handleChange,
    handleBrandChange,
    sizeInput,
    setSizeInput,
    addSize,
    removeSize,
    submitHandler,
}) {
    const input_style = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#f5f7fb',
            border: '1px solid #eaedf3',
            borderRadius: 4,
            '& fieldset': {
                border: 'none',
            },
            '&:hover fieldset': {
                border: 'none',
            },
            '&.Mui-focused fieldset': {
                border: 'none',
            },
        },
    };

    const delete_btn_style = {
        minWidth: 0,
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.75rem',
        color: '#ef4444',
        border: '1px solid #fecaca',
        backgroundColor: '#fff5f5',
        transition: 'all 0.2s ease',
    };

    const btn_style = {
        py: 1.4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #4693e5, #4693e5)',
        fontWeight: 600,
        fontSize: '1rem',
        textTransform: 'none',
        boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
        transition: 'all 0.2s ease',
    };

    const isFormValid = () => {
        return (
            form.title.trim() &&
            form.description.trim() &&
            form.price &&
            form.category &&
            form.gender &&
            form.brand.name.trim() &&
            form.sizes.length > 0 &&
            form.images.length > 0
        );
    };

    return (
        <div className="w-full max-w-[380px] md:max-w-[600px] mx-auto py-10 flex flex-col gap-10">
            <p className="text-center font-bold text-2xl mb-4"> افزودن محصول جدید</p>
            <TextField sx={input_style} fullWidth label="نام محصول" onChange={(e) => handleChange('title', e.target.value)} />
            <TextField sx={input_style} fullWidth label="توضیحات" multiline rows={4} onChange={(e) => handleChange('description', e.target.value)} />
            <TextField sx={input_style} label="قیمت" type="number" fullWidth onChange={(e) => handleChange('price', e.target.value)} />
            <TextField sx={input_style} label="تخفیف (درصد)" type="number" fullWidth onChange={(e) => handleChange('discount', e.target.value)} />
            <TextField
                sx={input_style}
                select
                label="دسته‌بندی"
                fullWidth
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
            >
                <MenuItem value="casual">روزمره</MenuItem>
                <MenuItem value="sport">ورزشی</MenuItem>
                <MenuItem value="running">دویدن</MenuItem>
                <MenuItem value="outdoor">کوهنوردی / فضای باز</MenuItem>
                <MenuItem value="boots">بوت</MenuItem>
                <MenuItem value="formal">رسمی</MenuItem>
            </TextField>

            <TextField sx={input_style} select label="جنسیت" fullWidth value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                <MenuItem value="male">مردانه</MenuItem>
                <MenuItem value="female">زنانه</MenuItem>
                <MenuItem value="boy_kids">بچگانه پسرانه</MenuItem>
                <MenuItem value="girl_kids">بچگانه دخترانه</MenuItem>
            </TextField>

            <TextField sx={input_style} fullWidth label="نام برند" onChange={(e) => handleBrandChange(e.target.value)} />

            <Box>
                <div className="flex gap-4">
                    <TextField
                        sx={input_style}
                        fullWidth
                        label="سایز"
                        value={sizeInput.size}
                        onChange={(e) => setSizeInput((p) => ({ ...p, size: e.target.value }))}
                    />

                    <TextField
                        sx={input_style}
                        fullWidth
                        label={`موجودی سایز ${sizeInput.size || '...'} در انبار`}
                        value={sizeInput.stock}
                        onChange={(e) => setSizeInput((p) => ({ ...p, stock: e.target.value }))}
                    />

                    <Button variant="contained" className="whitespace-nowrap" sx={btn_style} onClick={addSize}>
                        افزودن
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    {form.sizes.map((s, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between mt-3 gap-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
                        >
                            <p className="text-sm text-gray-700">
                                سایز: <span className="font-medium">{s.size}</span> | موجودی: <span className="font-medium">{s.stock}</span>
                            </p>

                            <Button size="small" onClick={() => removeSize(i)} sx={delete_btn_style}>
                                حذف
                            </Button>
                        </div>
                    ))}
                </div>
            </Box>
            <div className="flex items-center justify-center">
                <UploadImg setForm={setForm} form={form} />
            </div>
            <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />}
                label={form.isActive ? 'قابل فروش' : 'غیرقابل فروش'}
            />
            <Button variant="contained" fullWidth onClick={submitHandler} sx={btn_style}>
                ایجاد محصول
            </Button>
        </div>
    );
}
