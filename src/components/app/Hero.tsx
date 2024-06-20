const progressBarStyle = {
  animation: 'indeterminateAnimation 1s infinite linear',
  transformOrigin: '0% 50%',
};
export const Hero = () => {
  return (
    <section className=" flex justify-center items-center mx-auto flex-col gap-10 my-auto">
      <div className="text-center mx-[14px] mt-10">
      <main className="text-[40px] md:text-6xl font-bold">
        <h1 className="inline">
          <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
            Ticketing
          </span>{' '}
          landing page
        </h1>{' '}
        for{' '}
        <h2 className="inline">
          <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            Truckers.
          </span>{' '}
        </h2>
      </main>
      </div>
      <div className="text-center mx-[8px] mt-10">
        <main className="text-[32px] md:text-6xl font-bold">
        <h1 className="inline">
          <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
            The 
          </span>{' '}
          Site is 
        </h1>{' '}
        under
        <h2 className="inline">
          <span className="ml-2 inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            construction.
          </span>{' '}
        </h2>
      </main>
      </div>
      <div className="space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-72 mx-auto mt-6">
          <div className="h-1 bg-purple-200 w-full overflow-hidden">
            <div
              className="w-full h-full bg-blue-400"
              style={progressBarStyle}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
