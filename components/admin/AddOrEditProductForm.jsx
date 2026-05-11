import { Paper, Typography, TextField, Box, MenuItem, Button, Switch, FormControlLabel, Divider } from '@mui/material';
import UploadImg from '@/components/uploadImg';
import { shoesOptions, bagOptions, giftOptions, accessoryOptions, clothesOptions, hatOptions } from '@/helper/categories';

export default function AddProductForm({
    form,
    group,
    setForm,
    handleChange,
    handleBrandChange,
    sizeInput,
    setSizeInput,
    addSize,
    removeSize,
    submitHandler,
    formType,
}) {
    const getGroupOptions = (group) => {
        switch (group) {
            case 'shooes':
                return shoesOptions;
            case 'accesory':
                return accessoryOptions;
            case 'clothes':
                return clothesOptions;
            case 'bag':
                return bagOptions;
            case 'box':
                return giftOptions;
            default:
                return [];
        }
    };

    return (
        <div className="w-full max-w-[380px] md:max-w-[600px] mx-auto py-10 flex flex-col gap-10">
            <p className="text-center font-bold text-2xl mb-4">{formType == 'add' ? 'افزودن محصول جدید' : 'تغییر اطلاعات محصول'}</p>

            <TextField fullWidth label="نام محصول" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />

            <TextField
                fullWidth
                label="توضیحات"
                multiline
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
            />

            <TextField label="قیمت" type="number" fullWidth value={form.price} onChange={(e) => handleChange('price', e.target.value)} />

            <TextField
                label="تخفیف (درصد)"
                type="number"
                fullWidth
                value={form.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
            />

            <TextField select label="گروه" fullWidth value={form.group || ''} onChange={(e) => handleChange('group', e.target.value)}>
                <MenuItem value="shooes">کفش</MenuItem>
                <MenuItem value="accesory">اکسسوری</MenuItem>
                <MenuItem value="clothes">لباس</MenuItem>
                <MenuItem value="bag">کیف</MenuItem>
                <MenuItem value="box">باکس هدیه</MenuItem>
            </TextField>

            <TextField
                select
                label="کتگوری"
                disabled={!form.group}
                fullWidth
                value={form.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
            >
                {getGroupOptions(form.group).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField select label="جنسیت" fullWidth value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                <MenuItem value="none">بدون جنسیت</MenuItem>
                <MenuItem value="male">مردانه</MenuItem>
                <MenuItem value="female">زنانه</MenuItem>
                <MenuItem value="boy_kids">بچگانه پسرانه</MenuItem>
                <MenuItem value="girl_kids">بچگانه دخترانه</MenuItem>
            </TextField>

            <TextField fullWidth label="نام برند" value={form.brand?.name || ''} onChange={(e) => handleBrandChange(e.target.value)} />

            <Box>
                <div className="flex gap-4">
                    <TextField
                        fullWidth
                        label="سایز"
                        value={sizeInput.size}
                        onChange={(e) => setSizeInput((p) => ({ ...p, size: e.target.value }))}
                    />

                    <TextField
                        fullWidth
                        label={`موجودی سایز ${sizeInput.size || '...'} در انبار`}
                        value={sizeInput.stock}
                        onChange={(e) => setSizeInput((p) => ({ ...p, stock: e.target.value }))}
                    />

                    <Button variant="contained" className="whitespace-nowrap" onClick={addSize}>
                        افزودن
                    </Button>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                    {form.sizes.map((s, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-3 rounded-xl border border-gray-200   transition">
                            {/* INFO */}
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">سایز</span>
                                    <span className="font-semibold text-gray-800">{s.size}</span>
                                </div>

                                <div className="h-6 w-px bg-gray-200" />

                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">موجودی</span>
                                    <span className="font-semibold text-gray-800">{s.stock}</span>
                                </div>
                            </div>

                            {/* ACTION */}
                            <button
                                onClick={() => removeSize(i)}
                                className="text-sm px-3 py-1.5 rounded-lg text-[#ff0000] bg-[#ff000018] transition font-medium"
                            >
                                حذف
                            </button>
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

            <Button variant="contained" fullWidth onClick={submitHandler}>
                {formType == 'add' ? 'ایجاد محصول' : 'اعمال تغییرات'}
            </Button>
        </div>
    );
}
