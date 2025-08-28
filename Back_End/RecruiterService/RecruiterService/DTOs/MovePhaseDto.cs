namespace RecruiterService.DTOs
{
    public class MovePhaseDto
    {
        public List<int> Ids { get; set; } = new List<int>();
        public int TargetPhase { get; set; }
    }
}
