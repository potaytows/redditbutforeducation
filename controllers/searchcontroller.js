const SubjectModel = require('../models/SubjectModel');
const { getSubjects } = require('../middleware/getSubjects');

const ITEMS_PER_PAGE = 6; 

const searchSubjects = async (req, res) => {
  try {
    const searchTerm = ".*" + req.query.qry + ".*";
    const subjects = await getSubjects(req); 
    const page = parseInt(req.query.page) || 1;

    const resultCount = await SubjectModel.countDocuments({
      subjectName: { $regex: searchTerm, $options: 'i' }
    });

    const totalPages = Math.ceil(resultCount / ITEMS_PER_PAGE);

    const skip = (page - 1) * ITEMS_PER_PAGE;
    const result = await SubjectModel.find({
      subjectName: { $regex: searchTerm, $options: 'i' }
      
    })
      .skip(skip)
      .limit(ITEMS_PER_PAGE);

      res.render('searchResults', {
        pageInfo: { pageTitle: 'Reddeetznuts', pageType: "searchResults",subjects: subjects},
        result: result,
        currentPage: page,
        totalPages: totalPages,
        req: req,
        subjectInfo: { Object: subjects } 
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหารายวิชา' });
  }
  
};

module.exports = { searchSubjects };
