import { TextField, Box, MenuItem, Button, Switch, FormControlLabel, Select, FormControl } from '@mui/material';

import UploadImg from '@/components/uploadImg';

import { shoesOptions, bagOptions, giftOptions, accessoryOptions, clothesOptions, hatOptions, CATEGORY_GROUP } from '@/helper/categories';

import { COLOR_PALETTE } from '@/helper/help';

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
    isLoading,
    formType,
}) {
    const getGroupOptions = (group) => {
        switch (group) {
            case 'shoes':
                return shoesOptions;

            case 'accessory':
                return accessoryOptions;

            case 'clothes':
                return clothesOptions;

            case 'bag':
                return bagOptions;

            case 'box':
                return giftOptions;

            case 'hat':
                return hatOptions;

            default:
                return [];
        }
    };

    return (
        <div className="w-full max-w-[380px] md:max-w-[600px] mx-auto py-10 flex flex-col gap-10">
            <p className="text-center font-bold text-2xl mb-4">{formType === 'add' ? 'افزودن محصول جدید' : 'تغییر اطلاعات محصول'}</p>

            {/* TITLE */}
            <TextField fullWidth label="نام محصول" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />

            {/* DESCRIPTION */}
            <TextField
                fullWidth
                label="توضیحات"
                multiline
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
            />

            {/* PRICE */}
            <TextField label="قیمت (ریال)" type="number" fullWidth value={form.price} onChange={(e) => handleChange('price', e.target.value)} />

            {/* DISCOUNT */}
            <TextField
                label="تخفیف (درصد)"
                type="number"
                fullWidth
                value={form.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
            />

            {/* GROUP */}
            <TextField
                select
                label="گروه"
                fullWidth
                value={form.group || ''}
                onChange={(e) => {
                    handleChange('group', e.target.value);

                    // reset category when group changes
                    handleChange('category', '');
                }}
            >
                {CATEGORY_GROUP.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>

            {/* CATEGORY */}
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

            {/* GENDER */}
            <TextField select label="جنسیت" fullWidth value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                <MenuItem value="none">بدون جنسیت</MenuItem>
                <MenuItem value="male">مردانه</MenuItem>
                <MenuItem value="female">زنانه</MenuItem>
                <MenuItem value="boy_kids">بچگانه پسرانه</MenuItem>
                <MenuItem value="girl_kids">بچگانه دخترانه</MenuItem>
            </TextField>

            {/* BRAND */}
            <TextField fullWidth label="نام برند" value={form.brand?.name || ''} onChange={(e) => handleBrandChange(e.target.value)} />

            {/* SIZES */}
            <Box>
                <div className="flex gap-4">
                    {/* SIZE */}
                    <TextField
                        fullWidth
                        label="سایز"
                        value={sizeInput.size}
                        onChange={(e) =>
                            setSizeInput((p) => ({
                                ...p,
                                size: e.target.value,
                            }))
                        }
                    />

                    {/* COLOR */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.8,
                            minWidth: 120,
                        }}
                    >
                        <FormControl fullWidth size="small">
                            <Select
                                value={sizeInput.color}
                                onChange={(e) =>
                                    setSizeInput((p) => ({
                                        ...p,
                                        color: e.target.value,
                                    }))
                                }
                                sx={{
                                    borderRadius: 2,
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        py: 1.2,
                                    },
                                }}
                            >
                                {COLOR_PALETTE.map((c) => (
                                    <MenuItem
                                        key={c.hex}
                                        value={c.hex}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                backgroundColor: c.hex,
                                                borderRadius: '50%',
                                                border: '1px solid #ddd',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* STOCK */}
                    <TextField
                        fullWidth
                        type="number"
                        label={`موجودی سایز ${sizeInput.size || '...'} در انبار`}
                        value={sizeInput.stock}
                        onChange={(e) =>
                            setSizeInput((p) => ({
                                ...p,
                                stock: Number(e.target.value),
                            }))
                        }
                    />

                    {/* ADD BTN */}
                    <Button variant="contained" className="whitespace-nowrap" onClick={addSize}>
                        افزودن
                    </Button>
                </div>

                {/* SIZE LIST */}
                <div className="flex flex-col gap-3 mt-3">
                    {form.sizes.map((s, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                                {/* SIZE */}
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">سایز</span>

                                    <span className="font-semibold text-gray-800">{s.size}</span>
                                </div>

                                <div className="h-6 w-px bg-gray-200" />

                                {/* STOCK */}
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">موجودی</span>

                                    <span className="font-semibold text-gray-800">{s.stock}</span>
                                </div>

                                <div className="h-6 w-px bg-gray-200" />

                                {/* COLOR */}
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">رنگ</span>

                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full border"
                                            style={{
                                                backgroundColor: s.color || 'white',
                                            }}
                                        />

                                        <span className="font-semibold text-gray-800 text-xs">{s.color}</span>
                                    </div>
                                </div>
                            </div>

                            {/* REMOVE */}
                            <button
                                onClick={() => removeSize(i)}
                                className="text-sm px-3 py-1.5 rounded-lg text-[#ff0000] bg-[#ff000018] font-medium"
                            >
                                حذف
                            </button>
                        </div>
                    ))}
                </div>
            </Box>

            {/* IMAGE */}
            <div className="flex items-center justify-center">
                <UploadImg setForm={setForm} form={form} />
            </div>

            {/* ACTIVE */}
            <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />}
                label={form.isActive ? 'قابل فروش' : 'غیرقابل فروش'}
            />

            {/* SUBMIT */}
            <Button variant="contained" fullWidth onClick={submitHandler} disabled={isLoading}>
                {isLoading ? 'لطفا صبر کنید ...' : formType === 'add' ? 'ایجاد محصول' : 'اعمال تغییرات'}
            </Button>
        </div>
    );
}
