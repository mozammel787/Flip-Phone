
import NormalCard from '../../../Components/NormalCard';

const HomeAdvertised = ({ products }) => {

  return (
        <div className='container mx-auto my-12 lg:my-32'>
            <div className='flex justify-between items-center mx-3 my-12'>
                <div>
                    <h3 className='text-3xl md:text-4xl  mt-10 mb-2 font-bold'>Certified Pre-Owned Smartphones</h3>
                    <p className=' text-gray-600'>Premium quality used phones with warranty</p>
                </div>
                <button className='btn btn-outline btn-primary'>See All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  my-10 mx-3 ">

                {
                    products.slice(0, 12).map((p) => <NormalCard key={p._id}
                        product={p}
                    >
                    </NormalCard>)
                }
            </div>

        </div>
    );
};

export default HomeAdvertised;