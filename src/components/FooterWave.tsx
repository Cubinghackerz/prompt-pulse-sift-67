
import { motion } from 'framer-motion';

const FooterWave = () => {
  return (
    <div className="relative w-full h-12 overflow-hidden">
      <motion.div
        className="absolute inset-0 h-12"
        initial={{ backgroundPositionX: "0%" }}
        animate={{ backgroundPositionX: "100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%239b87f5' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: "1440px 320px",
        }}
      />
    </div>
  );
};

export default FooterWave;

