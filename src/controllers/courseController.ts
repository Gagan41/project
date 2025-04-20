import Course from '../models/Course'

export async function getCourse() {
  const course = await Course.findOne()
  if (!course) throw new Error('No course found')
  return course
}