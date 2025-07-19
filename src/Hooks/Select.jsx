
import { toast } from "react-toastify";





export const handleSelect = async (medicine, user, navigate, axiosSecure) => {

    if (!user) {
        navigate('/login');
        return;
    }

    const selected = {
        userEmail: user.email,
        medicineId: medicine._id,
        itemName: medicine.itemName,
        image: medicine.image,
        price: medicine.price,
        discount: medicine.discount,
        company: medicine.company,
        category: medicine.category,
        sellerEmail: medicine.userEmail,
        quantity: 1,
        selectedAt: new Date().toISOString()
    };


    try {
        const res = await axiosSecure.post('/cart', selected);
        if (res.data.insertedId) {
            toast.success('Added to cart');
            window.dispatchEvent(new Event('cart-updated'));
        } else if (res.data.exists) {
            toast.info('Already in cart');
        }
    } catch (err) {
        console.log(err)
        toast.error('Failed to add to cart');
    }
};