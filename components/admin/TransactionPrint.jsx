import React, { useRef } from 'react';
import { Dialog, DialogContent } from '@mui/material';

import { getColorNameByHex } from '@/helper/help';

function TransactionPrint({ open, onClose, data }) {
    const printRef = useRef();

    const user = data?.user || {};
    const pricing = data?.pricing || {};
    const items = data?.items || [];

    // print data
    const handlePrint = async () => {
        if (typeof window === 'undefined') return;

        const html2pdf = (await import('html2pdf.js')).default;

        const element = printRef.current;

        const opt = {
            margin: 0.5,
            filename: `transaction-${data._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogContent>
                <div
                    ref={printRef}
                    style={{
                        background: '#fff',
                        color: '#000',
                        padding: '20px',
                        fontSize: '16px',
                        lineHeight: '2',
                        fontFamily: 'Arial',
                    }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '25px', textAlign: 'center', marginBottom: '24px' }}>جزئیات تراکنش</p>

                    {/* اطلاعات کاربر */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <tbody>
                            {[
                                ['نام و نام خانوادگی', user.fullName],
                                ['شماره تماس', user.phone],
                                ['کد پستی', user.postalCode],
                                ['آدرس', user.address],
                                ['قیمت کل', `${(pricing.totalOriginalPrice || 0).toLocaleString()} ریال`],
                                ['تخفیف', `${(pricing.totalDiscount || 0).toLocaleString()} ریال`],
                                ['مبلغ نهایی', `${(pricing.totalFinalPrice || 0).toLocaleString()} ریال`],
                                ['شماره کارت', data?.cardPan || '---'],
                                ['کد پیگیری', data?.refId || '---'],
                                ['تاریخ پرداخت', data?.paidAt ? new Date(data.paidAt).toLocaleDateString('fa-IR') : '---'],
                            ].map(([label, value], i) => (
                                <tr key={i}>
                                    <td style={{ border: '1px solid #333', padding: '8px', fontWeight: 'bold', background: '#f5f5f5' }}>{label}</td>
                                    <td style={{ border: '1px solid #333', padding: '8px' }}>{value ?? '---'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '12px' }}>محصولات</p>

                    {/* محصولات */}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f0f0' }}>
                                {['محصول', 'سایز', 'رنگ', 'تعداد', 'قیمت'].map((h) => (
                                    <th key={h} style={{ border: '1px solid #333', padding: '10px' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid #333', padding: '8px' }}>{item?.product?.title || 'نامشخص'}</td>
                                        <td style={{ border: '1px solid #333', padding: '8px' }}>{item?.size || '---'}</td>
                                        <td style={{ border: '1px solid #333', padding: '8px' }}>{getColorNameByHex(item?.color) || '---'}</td>
                                        <td style={{ border: '1px solid #333', padding: '8px' }}>{item?.quantity || 0}</td>
                                        <td style={{ border: '1px solid #333', padding: '8px' }}>{(item?.finalPrice || 0).toLocaleString()} ریال</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: 10 }}>
                                        محصولی وجود ندارد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                    <button onClick={handlePrint} className="px-6  cursor-pointer py-2 rounded-lg bg-blue-600 text-white shadow-lg w-[160px]">
                        چاپ PDF
                    </button>

                    <button onClick={onClose} className="px-6 py-2 cursor-pointer rounded-lg bg-red-500 text-white shadow-lg w-[160px]">
                        لغو
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TransactionPrint;
